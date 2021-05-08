import Base from "./baseService";

class ForeignWarehousesService extends Base {
  index = async (data: any) => {
    return this.request({
      url: "/api/v1/foreignWarehouses/",
      method: "GET",
      data: data,
    });
  };

  comparePrice = async(data: any) => {
    return this.request({
      url: "/api/v1/foreignWarehouses/comparePrice",
      method: "POST",
      data: data,
    });
  }

  suggestActiveIngredient = async (data: any) => {
    return this.request({
      url: "/api/v1/foreignWarehouses/suggestActiveIngredient",
      method: "POST",
      data: data
    })
  }
}

export default () => new ForeignWarehousesService();
