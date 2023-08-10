import { useState } from "react";

interface URLParam {
  name: string;
  value: string | null;
}

interface UseHrefResult {
  addQueryParam: (paramName: string, value: string) => void;
  deleteQueryParam: (paramName: string) => void;
  getQueryParam: (paramName: string) => string | null;
}

const useHref = (): UseHrefResult => {
  const [urlParams, setURLParams] = useState<URLParam[]>([]);

  const updateURLParams = (newParams: URLParam[]) => {
    const searchParams = new URLSearchParams();

    newParams.forEach((param) => {
      if (param.value !== null) {
        searchParams.set(param.name, param.value);
      }
    });

    const newQueryString = searchParams.toString();
    const newURL =
      window.location.pathname + (newQueryString ? `?${newQueryString}` : "");

    window.history.pushState(null, "", newURL);
    setURLParams(newParams);
  };

  const addQueryParam = (paramName: string, value: string) => {
    const newParams = [...urlParams, { name: paramName, value }];
    updateURLParams(newParams);
  };

  const deleteQueryParam = (paramName: string) => {
    const newParams = urlParams.filter((param) => param.name !== paramName);
    updateURLParams(newParams);
  };

  const getQueryParam = (paramName: string): string | null => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(paramName);
  };

  return { addQueryParam, deleteQueryParam, getQueryParam };
};

export default useHref;
