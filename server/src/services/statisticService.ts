import Base from "./baseService";

class StatisticService extends Base {
  statistic = async (data: any) => {
    return this.request({
      url: "/api/v1/statistics/quantity",
      method: "GET",
      data: data,
    });
  };

  statisticRequest = async (data: any) => {
    return this.request({
      url: "/api/v1/statistics/requestDnc",
      method: "GET",
      data: data,
    });
  };

  statisticResult = async (data: any) => {
    return this.request({
      url: "/api/v1/statistics/result",
      method: "GET",
      data: data,
    });
  };
}

export default () => new StatisticService();
