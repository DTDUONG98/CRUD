import { FilterDatePicker } from "@root/src/components/Table";
import { GridTable } from "@root/src/components/Table";
import auth from "@root/src/helpers/auth";
import useBaseHook from "@src/hooks/BaseHook";
import { Input, Form, Row, Col, InputNumber, Button, Select, Typography, AutoComplete } from "antd";
import moment from "moment";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("@src/layouts/Admin"), { ssr: false });
import React, { useEffect, useReducer, useRef, useState } from "react";
import ForeignWarehousesService from "../../../services/foreignWarehousesService"
import { LeftCircleFilled, SaveFilled, DeleteFilled, RedoOutlined, SearchOutlined } from '@ant-design/icons';

const foreignWarehousesService = ForeignWarehousesService()

const Index = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useBaseHook();
  const [form] = Form.useForm();
  const [numOfIngredient, setNumOfIngredient] = useState(1);
  const tableASEANRef = useRef(null);
  const tableDevelopedRef = useRef(null);
  const [footerASEAN, setFooterASEAN] = useState(null);
  const [footerDeveloped, setFooterDeveloped] = useState(null);
  const [suggestedIngredients, setSuggestedIngredients] = useState([]);
  let timeout = null;
  const [params, setParams] = useState({
    activeIngredients: [],
    strengths: [],
  });

  const onNumOfIngrendientChange = (value: number) => {
    setNumOfIngredient(value);
  };

  const onChangeIngredient = async (value: string) => {
    if(timeout) clearTimeout(timeout)
    timeout = setTimeout(async () => {
      const response = await foreignWarehousesService
        .withAuth()
        .suggestActiveIngredient({ typed: value })
      const ingredients = response.map(res => {
        return {
          value: res.name
        }
      });
      setSuggestedIngredients(ingredients);
    }, 500);
  }

  useEffect(() => {
    return () => {
      if(timeout)
        clearTimeout(timeout);
    }
  })


  useEffect(() => {
    tableDevelopedRef.current.reload();
    tableASEANRef.current.reload();
}, [params])


  const fetchDataASEAN = async (values: any) => {
    
    if (!params.activeIngredients.length || !params.strengths.length) return ;
      if (!values.pageSize) values.pageSize = 5;
      if (!values.sorting.length) {
        values.sorting = [
          { field: "foreign_warehouses.createdAt", direction: "desc" },
        ];
      }
      setLoading(true);
      const countryGroup ='["mal","tw","sg", "phi"]'
      const result = await foreignWarehousesService.withAuth().comparePrice({...params, countryGroup});
      const dataForTable = result.dataForTable;

      setFooterASEAN({
        max: result.max,
        min: result.min,
        avg: result.avg
      });

      setLoading(false);
      return dataForTable;
  }

  const fetchDataDeveloped = async (values: any) => {

    if (!params.activeIngredients.length || !params.strengths.length) return ;

      if (!values.pageSize) values.pageSize = 5;
      if (!values.sorting.length) {
        values.sorting = [
          { field: "foreign_warehouses.createdAt", direction: "desc" },
        ];
      }
      setLoading(true);
      const countryGroup ='["us","uk","kr"]'
      const result = await foreignWarehousesService.withAuth().comparePrice({...params, countryGroup});
      const dataForTable = result.dataForTable;

      setFooterDeveloped({
        max: result.max,
        min: result.min,
        avg: result.avg
      });
      
      setLoading(false);
      return dataForTable;
  }
  

  const columns = [

    {
      title: t('pages:foreign_warehouses.table.name'),
      dataIndex: 'name',
      key: 'foreign_warehouses.name',
      sorter: true,
      fixed: 'left',
      width: "150px",
    },
    {
      title: t("pages:foreign_warehouses.table.activeIngredient"),
      dataIndex: 'activeIngredient',
      key: 'foreign_warehouses.activeIngredient',
      sorter: true,
      width: "150px",
      fixed: 'left',
      render: (data: any) => {
        return data.map( (e,idx) => {

          return (
            <Typography key={idx}>
              <Row>
                <Col span={24}>{e}</Col>
              </Row>
            </Typography>
          );
        }
        )
      },
    },
    {
      title: t("pages:foreign_warehouses.table.strength"),
      dataIndex: 'strength',
      key: 'foreign_warehouses.strength',
      sorter: true,
      fixed: 'left',
      width: "150px",
      render: (data: any) => {
        return data.map( (e,idx) => {

          return (
            <Typography key={idx}>
              <Row>
                <Col span={24}>{e}</Col>
              </Row>
            </Typography>
          );
        }
        )
      },
    },
    {
      title: t("pages:foreign_warehouses.table.price"),
      dataIndex: 'price',
      key: 'foreign_warehouses.price',
      sorter: true,
      width: "150px",
      fixed: 'left',
    },
    {
      title: t("pages:foreign_warehouses.table.type"),
      dataIndex: 'type',
      key: 'foreign_warehouses.type',
      sorter: true,
      width: "150px",
      fixed: 'left',
    },
    {
      title: t("pages:foreign_warehouses.table.form"),
      dataIndex: 'other',
      key: 'foreign_warehouses.other',
      sorter: true,
      width: "150px",
      render: (data:any) => {
        return data.form;
      }
    },
    {
      title: t("pages:foreign_warehouses.table.package"),
      dataIndex: 'package',
      key: 'foreign_warehouses.package',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:foreign_warehouses.table.createdAt"),
      dataIndex: 'createdAt',
      key: 'foreign_warehouses.createdAt',
      sorter: true,
      width: "150px",
      render: (text: string, record: any) => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : "",
      renderFilter: ({ column, confirm, ref }: FilterParam) =>
        <FilterDatePicker column={column} confirm={confirm} ref={ref} />
    },
  ]


  const onFormSubmit = async (values: any) => {
    const activeIngredients = Array(numOfIngredient).fill("");
    let idxActiveIngredient = 0;
    const strengths = Array(numOfIngredient).fill("");
    let idxStrength = 0;
    for (let [key, value] of Object.entries(values)) {
      if(!value) value = ''
      if (key.indexOf("activeIngredient") !== -1) activeIngredients[idxActiveIngredient++] = value;
      if (key.indexOf("strength") !== -1) strengths[idxStrength++] = value;
    }
    setParams({ activeIngredients, strengths});
  };

  const onClickResetButton = () => {
    form.resetFields();
    setFooterASEAN(null);
    setFooterDeveloped(null);
    setParams({
      activeIngredients: [],
      strengths: [],
    });
  }
  return (
    <div className="content">
      <Row gutter={[24, 0]}>
        <Col span={8}>
          <Form.Item
            label={`Nhập số lượng hoạt chất`}
          >
            <InputNumber
              min={1}
              max={4}
              defaultValue={numOfIngredient}
              value={numOfIngredient}
              onChange={onNumOfIngrendientChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form form={form} onFinish={onFormSubmit}>
        {Array(numOfIngredient)
          .fill(0)
          .map((ele, index) => {
            return (
              <div key={index}>
                <Row gutter={[24, 0]}>
                  <Col span={8}>
                    <Form.Item
                      label={t(
                        "pages:foreign_warehouses.form.activeIngredient"
                      )}
                      name={`foreign_warehouses.activeIngredient${index}`}
                      rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.name') }) },
                        {
                          whitespace: true,
                          message: t("messages:form.required", {
                            name: t(
                              "pages:foreign_warehouses.form.activeIngredient"
                            ),
                          }),
                        },
                        {
                          max: 255,
                          message: t("messages:form.maxLength", {
                            name: t(
                              "pages:foreign_warehouses.form.activeIngredient"
                            ),
                            length: 255,
                          }),
                        },
                      ]}
                    >
                      <AutoComplete
                        options={suggestedIngredients}
                        style={{ width: 200 }}
                        // onSelect={onSelect}
                        // onSearch={onSearch}
                        onChange={onChangeIngredient}
                        placeholder={t("pages:foreign_warehouses.form.activeIngredient")}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label={t("pages:foreign_warehouses.form.strength")}
                      name={`foreign_warehouses.strength${index}`}
                      rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.name') }) },
                        {
                          whitespace: true,
                          message: t("messages:form.required", {
                            name: t("pages:foreign_warehouses.form.strength"),
                          }),
                        },
                        {
                          max: 255,
                          message: t("messages:form.maxLength", {
                            name: t("pages:foreign_warehouses.form.strength"),
                            length: 255,
                          }),
                        },
                      ]}
                    >
                      <Input
                        placeholder={t("pages:foreign_warehouses.form.strength")}
                      />
                    </Form.Item>
                  </Col>
                  <Col></Col>
                </Row>
              </div>
            );
          })}
        <Form.Item wrapperCol={{ span: 24 }} className={"text-center"}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="btn-margin-left"
          >
            <SearchOutlined /> {t('buttons:search')}
          </Button>
          <Button
            type="dashed"
            htmlType="reset"
            className="btn-margin-right align-middle"
            onClick={onClickResetButton}
          >
            <RedoOutlined /> {t('buttons:reset')}
          </Button>
        </Form.Item>
      </Form>
      <GridTable
        ref={tableASEANRef}
        columns={columns}
        fetchData={fetchDataASEAN}
        addIndexCol={false}
        footer={() => {
          return <Row gutter={[24, 0]}>
            <Col span={8}>
              Giá nhỏ nhất : {(footerASEAN) ? footerASEAN.min : 0}
            </Col>
            <Col span={8}>
              Giá lớn nhất : {(footerASEAN) ? footerASEAN.max : 0}
            </Col>
            <Col span={8}>
              Giá trung bình : {(footerASEAN) ? footerASEAN.avg : 0}
            </Col>

          </Row>
        }}
      />
      <GridTable
        ref={tableDevelopedRef}
        columns={columns}
        fetchData={fetchDataDeveloped}
        addIndexCol={false}
        footer={() => {
          return <Row gutter={[24, 0]}>
            <Col span={8}>
              Giá nhỏ nhất : {(footerDeveloped) ? footerDeveloped.min : 0}
            </Col>
            <Col span={8}>
              Giá lớn nhất : {(footerDeveloped) ? footerDeveloped.max : 0}
            </Col>
            <Col span={8}>
              Giá trung bình : {(footerDeveloped) ? footerDeveloped.avg : 0}
            </Col>
          </Row>
        }}

      />
    </div>
  );
};

Index.Layout = (props) => {
  const { t } = useBaseHook();
  return (
    <Layout
      title={t("pages:foreign_warehouses.compare_price.title")}
      description={t("pages:foreign_warehouses.compare_price.description")}
      {...props}
    />
  );
};

export default Index;
