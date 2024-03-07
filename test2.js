

const test =[
    {
      id: 1,
      work: '12345',
      complete: 0,
      schedule_key: '6cd448c3-66b0-413e-bf17-d720820dc3ce',
      formatted_date: '2024-02-19'
    },
    {
      id: 2,
      work: '테스트입니다.',
      complete: 0,
      schedule_key: 'a4be7bf2-5fe1-41c8-b9f1-af307a3fc9e3',
      formatted_date: '2024-02-19'
    },
    {
      id: 3,
      work: '12515',
      complete: 0,
      schedule_key: 'd3bbcc3f-4ee6-45ca-a9c4-00b37b37454d',
      formatted_date: '2024-02-19'
    },
    {
      id: 4,
      work: '안녕하세요!!',
      complete: 0,
      schedule_key: '7223238f-14f9-4540-87b7-1d06940d4592',
      formatted_date: '2024-02-19'
    },
    {
      id: 5,
      work: '13일 등록',
      complete: 0,
      schedule_key: 'f9f0d362-ebb9-46bd-86f0-2e80f3614fb3',
      formatted_date: '2024-02-13'
    },
    {
      id: 6,
      work: '523525',
      complete: 0,
      schedule_key: '23923afd-e926-4d79-b325-bba6ffa56f85',
      formatted_date: '2024-02-20'
    },
    {
      id: 7,
      work: '안녕하세요',
      complete: 0,
      schedule_key: 'd5d7ac12-315d-43e7-9cf4-f7061ce41acc',
      formatted_date: '2024-02-20'
    },
    {
      id: 8,
      work: '235',
      complete: 0,
      schedule_key: 'e737eae7-97a0-4660-8058-8ef2fd7534a2',
      formatted_date: '2024-02-20'
    }
  ]


const obj = {};
for(const key in test){
    if(!obj[test[key].formatted_date]){
        obj[test[key].formatted_date] = []
    }
    obj[test[key].formatted_date].push(test[key])
}
console.log(obj);
// const num = () =>{
//     let num = 0;
//     const decrement = () =>{
//         return --num;
//     }
//     return decrement
// }


export type apiClientConfig<T extends {[key: string]: any}> = {
  method: httpMethod;
  url: string;
  data?: T;
  token?: string;
  headers?: {[key: string]: string};
  interceptor?: ((data?: any) => void)[];
};

export enum httpMethod {
  get = 'get',
  post = 'post',
  put = 'put',
  patch = 'patch',
  delete = 'delete',
}

export const useApiClient = () => {
  const baseUrl = process.env.REACT_APP_API_URL ?? '';

  // 요청
  const request = async <T extends {[key: string]: any}, U>(
    _config: apiClientConfig<T>,
  ): Promise<ApiResponse<U>> => {
    try {
      const config = {
        method: _config.method,
        url: _config.url,
        data: _config.data,
        headers: _config.headers ?? {'Content-Type': 'application/json'},
        token: _config.token,
        interceptor: _config.interceptor ?? [],
      };

      setUrlParams(config);
      setQueryParams(config);

      config.token &&
        (config.headers['Authorization'] = `Bearer ${config.token}`);

      Logger.log('useApiClient request', config);

      config.interceptor?.forEach(interceptor => interceptor());
      const fetchResponse = await fetch(baseUrl + config.url, {
        method: config.method,
        headers: {
          ...config.headers,
        },
        body:
          config.method !== httpMethod.get && config.data
            ? JSON.stringify(config.data)
            : undefined,
      });
      const data = (await fetchResponse.json()) as U;
      const apiResponse = new ApiResponse<U>(
        fetchResponse.status,
        fetchResponse.statusText,
        data,
      );
      Logger.log('useApiClient response', apiResponse);
      return apiResponse;
    } catch (e: any) {
      Logger.log('useApiClient error', e);
      Logger.error(e);
      return new ApiResponse<U>(
        e.status ?? 500,
        e.statusText ?? 'Internal Server Error!',
        undefined,
      );
    }
  };

  // get 방식일 경우 query 파라미터 처리
  const setQueryParams = <T extends {[key: string]: any}>(
    config: apiClientConfig<T>,
  ) => {
    if (!config.data || config.method !== httpMethod.get) {
      return;
    }
    const params = new URLSearchParams(config.data);
    config.url = `${config.url}?${params}`;
  };

  // url 파라미터가 있는 경우 처리
  const setUrlParams = <T extends {[key: string]: any}>(
    config: apiClientConfig<T>,
  ) => {
    if (!config.data) {
      return;
    }

    Object.keys(config.data).forEach(key => {
      if (config.data && config.url.includes(`{${key}}`)) {
        config.url = config.url.replace(`{${key}}`, config.data[key]);
        delete config.data[key];
      }
    });
  };

  return {request};
};


export default class ApiResponse<T> {
  readonly status: number;
  readonly statusText: string;
  readonly data?: T;

  readonly isSuccess: boolean;
  readonly isTokenExpired: boolean;

  constructor(status: number, statusText: string, data?: T) {
    this.status = status;
    this.statusText = statusText;
    this.data = data;

    this.isSuccess = status === 200 || status === 201 || status === 204;
    this.isTokenExpired = status === 401;
  }

  onFail(callback: (error: {status: number; statusText: string}) => void) {
    if (this.isTokenExpired) {
      return this;
    }

    if (!this.isSuccess) {
      callback({
        status: this.status,
        statusText: this.statusText,
      });
    }

    return this;
  }

  onSuccess(callback: (response: SuccessResponse<T>) => void) {
    if (this.isTokenExpired) {
      return this;
    }

    if (this.isSuccess && this.data) {
      const response = new SuccessResponse<T>(
          this.status,
          this.statusText,
          this.data,
      );

      callback(response);
    }
    return this;
  }

  onTokenExpired(callback: () => void) {
    if (this.isTokenExpired) {
      callback();
    }
    return this;
  }
}

/**
 * 응답이 성공인 경우 성공 응답
 * APIResponse 의 onSuccess 에서 사용
 */
export class SuccessResponse<T> {
  statusCode: number;
  message: string;
  data: T;

  constructor(code: number, message: string, data: T) {
    this.statusCode = code;
    this.message = message;
    this.data = data;
  }
}




// const result = num();
// console.log(result());

// const sum = decrement();
// console.log(sum);


