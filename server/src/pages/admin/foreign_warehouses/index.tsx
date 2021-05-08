import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import { GridTable } from '@src/components/Table';
import FilterDatePicker from '@src/components/Table/SearchComponents/DatePicker'
import { Button, Form, Row, Col, Typography } from 'antd';
import vnWarehouseService from '@root/src/services/vnWarehouseService';
import _ from 'lodash'
import moment, { relativeTimeRounding } from 'moment'
import to from 'await-to-js'
import auth from '@src/helpers/auth'
import React, { useState, useRef, useEffect } from 'react';
import { confirmDialog } from '@src/helpers/dialogs'
import useBaseHook from '@src/hooks/BaseHook'
import usePermissionHook from "@src/hooks/PermissionHook";
import { PlusCircleOutlined, DeleteOutlined, LoginOutlined, EditOutlined } from '@ant-design/icons';
import FormSearch from '@src/components/Admin/ForeignWarehouses/form_search';
import { LeftCircleFilled, SaveFilled, DeleteFilled, RedoOutlined } from '@ant-design/icons';
import foreignWarehousesService from "@root/src/services/foreignWarehousesService"

let isFiltered = null;

const Index = () => {
  const { t, notify, redirect } = useBaseHook();
  const tableRef = useRef(null)
  const { checkPermission } = usePermissionHook();
  const [selectedIds, setSelectedIds] = useState([])
  const [hiddenDeleteBtn, setHiddenDeleteBtn] = useState(true)
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(null);


  const createPer = checkPermission({
    "foreign_warehouses": "C"
  })
  const updatePer = checkPermission({
    "foreign_warehouses": "U"
  })
  const deletePer = checkPermission({
    "foreign_warehouses": "D"
  })

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
      width: "300px",
      fixed: 'left',
      render: (data: any): any[] => {
        let text: string;
        let standard: string[];

        standard = data;
        let contentActiveIngredient: any[] = [];
        for (let e of standard) {
          let row: any = <Typography>
            <Row>
              <Col span={24}>{e}</Col>
            </Row>
          </Typography>;
          contentActiveIngredient.push(row);
        }

        return contentActiveIngredient;
      }
    },
    {
      title: t("pages:foreign_warehouses.table.strength"),
      dataIndex: 'strength',
      key: 'foreign_warehouses.strength',
      sorter: true,
      fixed: 'left',
      width: "150px",
      render: (data: any): any[] => {

        let text: string;
        let standard: string[];

        standard = data;
        let contentStrength: any[] = [];
        for (let e of standard) {
          let row: any = <Typography>
            <Row>
              <Col span={24}>{e}</Col>
            </Row>
          </Typography>;
          contentStrength.push(row);
        }
        
        return contentStrength;
      }
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
      title: t("pages:foreign_warehouses.table.unit"),
      dataIndex: 'unit',
      key: 'foreign_warehouses.unit',
      sorter: true,
      width: "70px",
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
      title: t("pages:foreign_warehouses.table.typePrice"),
      dataIndex: 'typePrice',
      key: 'foreign_warehouses.typePrice',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:foreign_warehouses.table.declarationDate"),
      dataIndex: 'declarationDate',
      key: 'foreign_warehouses.declarationDate',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:foreign_warehouses.table.petition"),
      dataIndex: 'petition',
      key: 'foreign_warehouses.petition',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:foreign_warehouses.table.registerCode"),
      dataIndex: 'registerCode',
      key: 'foreign_warehouses.registerCode',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:foreign_warehouses.table.priceCIF"),
      dataIndex: 'priceCIF',
      key: 'foreign_warehouses.priceCIF',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:foreign_warehouses.table.company"),
      dataIndex: 'company',
      key: 'foreign_warehouses.company',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:foreign_warehouses.table.decisionCode"),
      dataIndex: 'decisionCode',
      key: 'foreign_warehouses.decisionCode',
      sorter: true,
      width: "150px",

    },
    {
      title: t("pages:foreign_warehouses.table.priceTotal"),
      dataIndex: 'priceTotal',
      key: 'foreign_warehouses.priceTotal',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:foreign_warehouses.table.class"),
      dataIndex: 'type',
      key: 'foreign_warehouses.type',
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
    // {
    //   title: t("pages:action"),
    //   dataIndex: 'action',
    //   key: "action",
    //   render: (text: string, record: any) => {
    //     return (<>
    //       {record.id !== auth().user.id ? (
    //         <Button onClick={() => loginAs(record)}
    //           className="btn-margin-right"
    //         >
    //           <LoginOutlined />
    //           {t('buttons:loginAs')}
    //         </Button>
    //       ): null}
    //     </>
    //     )
    //   }
    // }
  ]

  const onChangeSelection = (data: any) => {

    if (data.length > 0) setHiddenDeleteBtn(false)
    else setHiddenDeleteBtn(true)
    setSelectedIds(data)
  }

  const fetchData = async (values: any) => {
    // if (!isFiltered) return null;
    setLoading(true);
    for (let key in filter) {
      values.filters = (values.filters) ? values.filters : [];
      values.filters.push({
        field: key,
        operator: '=', // =, contains
        value: filter[key]
      });
    }
    if (!values.pageSize) values.pageSize = 5;
    if (!values.sorting.length) {
      values.sorting = [
        { field: "foreign_warehouses.createdAt", direction: "desc" },
      ];
    }
    let [error, result]: [any, VNWarehouse[]] = await to(foreignWarehousesService().withAuth().index(values));
    setLoading(false);
    if (error) {
      const { code, message } = error
      notify(t(`errors:${code}`), t(message), 'error')
      return {}
    }
    console.log(result)
    return result;
  }

  const onDelete = async () => {

    let [error, result]: any[] = await to(vnWarehouseService().withAuth().delete({ ids: selectedIds }));
    if (error) return notify(t(`errors:${error.code}`), '', 'error')
    notify(t("messages:message.recordAdminDeleted"));
    if (tableRef.current !== null) {
      tableRef.current.reload()
    }
    setSelectedIds([])
    setHiddenDeleteBtn(true)
    return result
  }

  const rowSelection = {

    getCheckboxProps: record => ({
      disabled: record.id == auth().user.id,
      id: record.id,
    }),
  };

  const onFinish = async (values: any): Promise<void> => {
    for (let key in values) {
      if (!values[key]) delete values[key];
    }
    setFilter(values);
    isFiltered = values;
    tableRef.current.reload(values);
  }

  return <>
    <div className="content">
      {/* <Button hidden={!createPer}
        onClick={() => redirect("frontend.admin.foreign_warehouses.create")}
        type="primary"
        className='btn-top'
      >
        <PlusCircleOutlined />
        {t('buttons:create')}
      </Button> */}
      <Button
        type="primary" danger
        className='btn-top'
        hidden={hiddenDeleteBtn || !deletePer}
        onClick={() => {
          confirmDialog({
            title: t('buttons:deleteItem'),
            content: t('messages:message.deleteConfirm'),
            onOk: () => onDelete()
          })
        }}
      >
        <DeleteOutlined />
        {t('buttons:delete')}
      </Button>
      <Form
        form={form}
        name="searchDrug"
        layout="vertical"
        onFinish={onFinish}
        scrollToFirstError
      >
        <FormSearch />
        <Form.Item wrapperCol={{ span: 24 }} className="text-center">
          <Button type="primary" htmlType="submit" className="btn-margin-right" loading={loading}>
            <SaveFilled /> {t('buttons:search')}
          </Button>
          <Button type="dashed" htmlType="reset" className="btn-margin-right" onClick={() => {
            setFilter(null);
            isFiltered = null;
            form.resetFields();
            tableRef.current.reset();
          }}>
            <RedoOutlined /> {t('buttons:reset')}
          </Button>
        </Form.Item>
      </Form>
      <GridTable
        ref={tableRef}
        columns={columns}
        fetchData={fetchData}
        rowSelection={{
          selectedRowKeys: selectedIds, onChange: (data: any[]) => onChangeSelection(data),
          ...rowSelection
        }}
        addIndexCol={false}
      />
    </div>
  </>
}

Index.Layout = (props) => {
  const { t } = useBaseHook();
  return <Layout
    title={t("pages:foreign_warehouses.index.title")}
    description={t("pages:foreign_warehouses.index.description")}
    {...props}
  />
}

Index.permissions = {
  "foreign_warehouses": "R"
};

export default Index
