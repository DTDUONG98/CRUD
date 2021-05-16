import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import { GridTable } from '@src/components/Table';
import FilterDatePicker from '@src/components/Table/SearchComponents/DatePicker'
import { Button, Form, Row, Col } from 'antd';
import vnRawDataService from '@root/src/services/vnRawDataService';
import _ from 'lodash'
import moment, { relativeTimeRounding } from 'moment'
import to from 'await-to-js'
import auth from '@src/helpers/auth'
import React, { useState, useRef } from 'react';
import { confirmDialog } from '@src/helpers/dialogs'
import useBaseHook from '@src/hooks/BaseHook'
import usePermissionHook from "@src/hooks/PermissionHook";
import { PlusCircleOutlined, DeleteOutlined, LoginOutlined, EditOutlined } from '@ant-design/icons';
import FormSearch from '@src/components/Admin/VnRawData/form_search';
import { LeftCircleFilled, SaveFilled, DeleteFilled, RedoOutlined, SearchOutlined } from '@ant-design/icons';

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
    "vn_raw_datas": "C"
  })
  const updatePer = checkPermission({
    "vn_raw_datas": "U"
  })
  const deletePer = checkPermission({
    "vn_raw_datas": "D"
  })

  const columns = [
    // {
    //   title: t('pages:vn_raw_datas.table.firstName'),
    //   dataIndex: 'firstName',
    //   key: 'vn_raw_datas.firstName',
    //   sorter: true,
    //   filterable: true,
    //   render: (text: string, record: any) => {
    //     return updatePer ? (
    //       <a onClick={() => redirect('frontend.admin.vn_raw_datas.edit', { id: record.id })}>
    //         <span className="show-on-hover">
    //           {record.firstName}
    //           <EditOutlined className="show-on-hover-item" />
    //         </span>
    //       </a>
    //     ): record.firstName
    //   }
    // },
    {
      title: t('pages:vn_raw_datas.table.name'),
      dataIndex: 'name',
      key: 'vn_raw_datas.name',
      sorter: true,
      fixed: 'left',
      width: "150px",
    },
    {
      title: t("pages:vn_raw_datas.table.activeIngredient"),
      dataIndex: 'activeIngredient',
      key: 'vn_raw_datas.activeIngredient',
      sorter: true,
      width: "150px",
      fixed: 'left',
    },
    {
      title: t("pages:vn_raw_datas.table.price"),
      dataIndex: 'price',
      key: 'vn_raw_datas.price',
      sorter: true,
      width: "150px",
      fixed: 'left',
    },
    {
      title: t("pages:vn_raw_datas.table.form"),
      dataIndex: 'form',
      key: 'vn_raw_datas.form',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:vn_raw_datas.table.strength"),
      dataIndex: 'strength',
      key: 'vn_raw_datas.strength',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:vn_raw_datas.table.package"),
      dataIndex: 'package',
      key: 'vn_raw_datas.package',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:vn_raw_datas.table.unit"),
      dataIndex: 'unit',
      key: 'vn_raw_datas.unit',
      sorter: true,
      width: "70px",
    },
    {
      title: t("pages:vn_raw_datas.table.typePrice"),
      dataIndex: 'typePrice',
      key: 'vn_raw_datas.typePrice',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:vn_raw_datas.table.declarationDate"),
      dataIndex: 'declarationDate',
      key: 'vn_raw_datas.declarationDate',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:vn_raw_datas.table.petition"),
      dataIndex: 'petition',
      key: 'vn_raw_datas.petition',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:vn_raw_datas.table.registerCode"),
      dataIndex: 'registerCode',
      key: 'vn_raw_datas.registerCode',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:vn_raw_datas.table.priceCIF"),
      dataIndex: 'priceCIF',
      key: 'vn_raw_datas.priceCIF',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:vn_raw_datas.table.company"),
      dataIndex: 'company',
      key: 'vn_raw_datas.company',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:vn_raw_datas.table.decisionCode"),
      dataIndex: 'decisionCode',
      key: 'vn_raw_datas.decisionCode',
      sorter: true,
      width: "150px",

    },
    {
      title: t("pages:vn_raw_datas.table.priceTotal"),
      dataIndex: 'priceTotal',
      key: 'vn_raw_datas.priceTotal',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:vn_raw_datas.table.class"),
      dataIndex: 'class',
      key: 'vn_raw_datas.class',
      sorter: true,
      width: "150px",
    },
    {
      title: t("pages:vn_raw_datas.table.createdAt"),
      dataIndex: 'createdAt',
      key: 'vn_raw_datas.createdAt',
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

  // const loginAs = async (record: any) => {
  //   let [error, result]: any[] = await to(vn_raw_dataservice().withAuth().loginAs({ id: record.id }))
  //   if (error) return notify(t('messages:message.loginFailed'), t(`errors:${error.code}`), 'error')
  //   auth().setAuth(result)
  //   notify(t('messages:message.loginSuccess'))
  //   redirect('frontend.admin.dashboard.index')
  // }

  const onChangeSelection = (data: any) => {
    if (data.length > 0) setHiddenDeleteBtn(false)
    else setHiddenDeleteBtn(true)
    setSelectedIds(data)
  }

  const fetchData = async (values: any) => {
    if (!isFiltered) return null;
    setLoading(true);
    for (let key in filter) {
      values.filters = (values.filters) ? values.filters : [];
      let operator = 'contains';
      //if(key == "vn_raw_datas.activeIngredient" || key == "vn_raw_datas.name") operator = 'similarity'

      values.filters.push({
        field: key,
        operator: operator, // =, contains
        value: filter[key]
      });
    }
    if (!values.filters.length) {setLoading(false); return null};
    if (!values.pageSize) values.pageSize = 5;
    if (!values.sorting.length) {
      values.sorting = [
        { field: "createdAt", direction: "desc" },
      ];
    } 
    let [error, result]: [any, VNWarehouse[]] = await to(vnRawDataService().withAuth().index(values));
    setLoading(false);
    if (error) {
      const { code, message } = error
      notify(t(`errors:${code}`), t(message), 'error')
      return {}
    }
    return result;
  }

//   const onDelete = async () => {
//     let [error, result]: any[] = await to(vnRawDataService().withAuth().delete({ ids: selectedIds }));
//     if (error) return notify(t(`errors:${error.code}`), '', 'error')
//     notify(t("messages:message.recordAdminDeleted"));
//     if (tableRef.current !== null) {
//       tableRef.current.reload()
//     }
//     setSelectedIds([])
//     setHiddenDeleteBtn(true)
//     return result
//   }

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
    if (!values) return null;
    setFilter(values);
    isFiltered = values;
    tableRef.current.reload(values);
  }

  return <>
    <div className="content">
      {/* <Button hidden={!createPer}
        onClick={() => redirect("frontend.admin.vn_raw_datas.create")}
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
            // onOk: () => onDelete()
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
            <SearchOutlined /> {t('buttons:search')}
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
    title={t("pages:vn_raw_datas.index.title")}
    description={t("pages:vn_raw_datas.index.description")}
    {...props}
  />
}

Index.permissions = {
  "vn_raw_datas": "R"
};

export default Index
