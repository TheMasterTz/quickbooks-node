import {
  cloneDeep,
  findIndex,
  isArray,
  isNil,
  isObject,
  isUndefined,
  omitBy,
  transform,
  find,
  upperFirst,
} from 'lodash';
import axios, { AxiosInstance } from 'axios';
import * as AxiosLogger from 'axios-logger';
import sqlstring from 'sqlstring';
import fs from 'fs/promises';
import util from 'util';
import path from 'path';

import {
  QuickbooksConfig,
  entityType,
  optionsType,
} from '../types/quickbooks.types';

let packageJson = {} as any;

const packageJsonData = async () => {
  const data = (await fs.readFile(
    new URL('../package.json', import.meta.url)
  )) as any;
  packageJson = JSON.parse(data);
};
packageJsonData();

export class QuickBooksBase implements QuickbooksConfig {
  accessToken: string;
  refreshToken: string;
  realmId: string | number;
  minorVersion?: string | number | null | undefined;
  useSandbox?: boolean | undefined;
  debug?: boolean | undefined;
  axios: AxiosInstance;

  constructor(config: QuickbooksConfig) {
    this.accessToken = config.accessToken;
    this.refreshToken = config.refreshToken;
    this.realmId = config.realmId;
    this.minorVersion = config.minorVersion ?? this.minorVersion;
    this.useSandbox = config.useSandbox ?? this.useSandbox;
    this.debug = config.debug ?? this.debug;

    if (!this.accessToken) throw new Error('Access token is required');
    if (!this.realmId) throw new Error('Realm ID is required');
    if (!this.refreshToken) throw new Error('Refresh token is required');

    const useSandboxUrl = this.useSandbox
      ? 'https://sandbox-quickbooks.api.intuit.com'
      : 'https://quickbooks.api.intuit.com';

    this.axios = axios.create({
      baseURL: new URL('/v3/company/', useSandboxUrl).toString(),
      headers: {
        'user-agent': `quickbooks-node: version ${packageJson.version}`,
      },
      params: { minorversion: this.minorVersion },
    });
    let loggerConfig = {
      prefixText: 'QuickBooks',
      dateFormat: 'HH:MM:ss',
      headers: true,
      params: true,
    };

    if (this.debug) {
      this.axios.interceptors.request.use((request) => {
        return AxiosLogger.requestLogger(request, loggerConfig);
      });

      this.axios.interceptors.response.use((response) => {
        return AxiosLogger.responseLogger(response, loggerConfig);
      });
    }
  }

  async update(entityName: string, entity: any): Promise<object> {
    if ((!entity.Id || !entity.SyncToken) && entityName !== 'exchangerate')
      throw new Error(
        `${entityName} must contain Id and SyncToken fields: ${util.inspect(
          entity,
          {
            showHidden: false,
            depth: null,
          }
        )}`
      );

    let url = path.posix.join('/', entityName.toLowerCase());
    let params = { operation: 'update' } as any;
    if (isNil(entity.sparse)) entity.sparse = true;
    if (entity.void === true) {
      if (entityName === 'invoice') params.operation = 'void';
      else params.include = 'void';
    }
    delete entity.void;

    let response = (await this.request(
      url,
      { method: 'post', params },
      entity
    )) as any;
    return response?.[upperFirst(entityName)] || response;
  }

  /**
   * Delete QuickBooks record
   * @param {String} entityName
   * @param {Object|String} idOrEntity
   * @returns {Promise<Object>}
   */
  async delete(
    entityName: string,
    idOrEntity: object | string
  ): Promise<object> {
    let url = path.posix.join('/', entityName.toLowerCase());
    let params = { operation: 'delete' };
    let entity = (await this.getEntity(entityName, idOrEntity)) as entityType;
    return await this.request(url, { method: 'post', params }, entity);
  }

  /**
   *
   * @param {String} url URL Endpoint of API
   * @param {Object} options Request options
   * @param {'head'|'get'|'post'|'put'|'patch'|'delete'|'options'} options.method
   * @param {Object} options.headers
   * @param {Object} options.params
   * @param {Object|FormData|null} entity
   * @returns {Promise<Object>}
   */
  async request(
    url: string,
    options: optionsType,
    entity?: entityType
  ): Promise<object> {
    url = path.posix.join('/', String(this.realmId), url);
    let method: string = options.method ?? 'get';
    let headers: any = options.headers ?? {};
    let params: any = options.params ?? {};
    let responseType: any = 'json';

    let defaultHeaders: any = {
      authorization: `Bearer ${this.accessToken}`,
    };

    if (!['head', 'get'].includes(method))
      defaultHeaders['content-type'] = 'application/json';
    if (url.match(/pdf$/)) {
      defaultHeaders['accept'] = 'application/pdf';
      responseType = 'arraybuffer';
    }

    if (entity?.allowDuplicateDocNum) {
      delete entity.allowDuplicateDocNum;
      params.include = 'allowduplicatedocnum';
    }
    if (entity?.requestId) {
      params.requestid = params.requestid || entity.requestId; // Do not override if exist
      delete entity.requestId;
    }

    // Clean data after several removal
    let data = entity || undefined;

    const aggregatedHeaders = omitBy(
      {
        ...defaultHeaders,
        ...headers, // Can override default headers
      },
      isUndefined
    );

    const response = await this.axios({
      url,
      method,
      headers: aggregatedHeaders,
      params,
      data,
      responseType,
    });
    return response.data;
  }

  /**
   * Get QuickBooks records
   * @param {String} url URL Endpoint of API
   * @param {Object} options Request options
   * @param {'head'|'get'|'post'|'put'|'patch'|'delete'|'options'} options.method
   * @param {Object} options.headers
   * @param {Object} options.params
   * @param {Object|null} entity
   * @returns {Promise<Object>}
   */
  async query(entity: any | string, parameters: any): Promise<object> {
    if (isNil(parameters)) parameters = [];
    if (!isObject(parameters)) throw new Error('Invalid query');
    parameters = cloneDeep(parameters); // Create a deep copy of parameters
    if (!isArray(parameters))
      parameters = transform(
        parameters,
        (acc, value, key) =>
          acc.push({
            field: key,
            value,
            operator: isArray(value) ? 'IN' : '=',
          } as never),
        []
      );
    else {
      parameters = parameters.map(({ field, value, operator }) => ({
        field,
        value,
        operator: operator || '=',
      }));
    }

    let countIndex = findIndex(parameters, { field: 'count', value: true });
    let count = countIndex !== -1 ? true : false;
    if (count) parameters.splice(countIndex, 1);

    let query = `${count ? 'select count(*) from' : 'select * from'} ${entity}`;

    let limitParams = find(parameters, ['field', 'limit']);
    let offsetParams = find(parameters, ['field', 'offset']);
    if (!limitParams) parameters.push({ field: 'limit', value: 1000 });
    if (!offsetParams) parameters.push({ field: 'offset', value: 1 });
    let fetchAll = Boolean(
      find(parameters, { field: 'fetchAll', value: true })
    );

    query += this.parseQueryParams(parameters, count);

    let response = (await this.request('/query', {
      method: 'get',
      params: { query },
    })) as any;

    if (fetchAll && !count) {
      let limitObject = find(parameters, ['field', 'limit']);
      let offsetObject = find(parameters, ['field', 'offset']);
      if (response?.QueryResponse?.maxResults === limitObject.value) {
        offsetObject.value += limitObject.value;
        let responseFields = Object.keys(response.QueryResponse);
        let entityKey = responseFields.find(
          (value) => value.toLowerCase() === entity.toLowerCase()
        );
        let recursiveResponse = (await this.query(entity, parameters)) as any;

        response.QueryResponse[entityKey as typeof response.QueryResponse] =
          response.QueryResponse[
            entityKey as typeof response.QueryResponse
          ].concat(
            recursiveResponse?.QueryResponse?.[
              entityKey as typeof response.QueryResponse
            ] || []
          );
        response.QueryResponse.maxResults +=
          recursiveResponse?.QueryResponse?.maxResults || 0;
        response.time = recursiveResponse.time || response.time;
      }
    }
    return response;
  }

  /**
   *
   * @param {Object[]} params Array of query params objects
   * @param {Boolean} count Whether it's a count query or not
   * @returns {String} Parsed query parameters
   */
  parseQueryParams(params: any, count: boolean = false): string {
    let { query, asc, desc, limit, offset } = params.reduce(
      (
        result: { [x: string]: any },
        current: { field: any; value: any; operator: any }
      ) => {
        let { field, value, operator } = current;
        if (field === 'fetchAll') return result;
        else if (['asc', 'desc', 'limit', 'offset'].includes(field))
          result[field] = value;
        else {
          result['query'] += `${
            result['query'] ? ' and ' : ''
          }${field} ${operator} ${
            isArray(value)
              ? '(' + sqlstring.escape(value) + ')'
              : sqlstring.escape(value)
          }`;
        }
        return result;
      },
      {
        query: '',
        asc: null,
        desc: null,
        limit: 1000,
        offset: 1,
      }
    );

    if (query) query = ` where ${query}`;
    if (!count) {
      if (asc) query += ` orderby ${asc} asc`;
      if (desc) query += ` orderby ${desc} desc`;
      query += ` startposition ${offset} maxresults ${limit}`;
    }
    return query;
  }

  async report(
    reportType: string,
    params: object | undefined
  ): Promise<object> {
    params = params || {};
    let url = path.posix.join('/reports', reportType);
    return await this.request(url, { method: 'get', params });
  }

  /**
   * Create QuickBooks record
   * @param {String} entityName
   * @param {Object} entity
   * @returns {Promise<Object>}
   */
  async create(entityName: string, entity: entityType): Promise<object> {
    let url = path.posix.join('/', entityName.toLowerCase());
    let response = (await this.request(url, { method: 'post' }, entity)) as any;
    return response?.[upperFirst(entityName)] || response;
  }

  /**
   * Get QuickBooks record
   * @param {String} entityName
   * @param {String} id
   * @returns {Promise<Object>}
   */
  async read(entityName: string, id: string): Promise<object> {
    let url = path.posix.join('/', entityName.toLowerCase(), String(id));
    let response = (await this.request(url, {
      method: 'get',
      params: undefined,
    })) as any;
    return response?.[upperFirst(entityName)] || response;
  }

  /**
   * get Entity object from ID or Entity
   * @param {String} entityName
   * @param {Object|String} idOrEntity
   * @returns {Promise<Object>}
   */
  async getEntity(
    entityName: string,
    idOrEntity: object | string
  ): Promise<object> {
    if (isObject(idOrEntity)) return idOrEntity;
    return await this.read(entityName, idOrEntity);
  }

  /**
   * Get instance's access token
   * @returns {String}
   */
  getAccessToken(): string {
    return this.accessToken;
  }

  /**
   * Update instance's access token
   * @param {String} token
   * @returns {String}
   */
  setAccessToken(token: string): string {
    this.accessToken = token;
    return this.accessToken;
  }
}
