import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import { GridTable } from '@src/components/Table';
import FilterDatePicker from '@src/components/Table/SearchComponents/DatePicker'
import { Button, Form, Row, Col, Typography } from 'antd';
import foreignRawDataSerivce from '@root/src/services/foreignRawDataSerivce';
import _ from 'lodash'
import moment, { relativeTimeRounding } from 'moment'
import to from 'await-to-js'
import auth from '@src/helpers/auth'
import React, { useState, useRef } from 'react';
import { confirmDialog } from '@src/helpers/dialogs'
import useBaseHook from '@src/hooks/BaseHook'
import usePermissionHook from "@src/hooks/PermissionHook";
import { PlusCircleOutlined, DeleteOutlined, LoginOutlined, EditOutlined } from '@ant-design/icons';
import FormSearch from '@src/components/Admin/ForeignRawData/form_search';
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
    "foreign_raw_datas": "C"
  })
  const updatePer = checkPermission({
    "foreign_raw_datas": "U"
  })
  const deletePer = checkPermission({
    "foreign_raw_datas": "D"
  })

  const columns = [
    {
      title: t('pages:foreign_raw_datas.table.type'),
      dataIndex: 'type',
      key: 'foreign_raw_datas.type',
      sorter: true,
      fixed: 'left',
      width: "150px",
    },
    {
      title: t("pages:foreign_raw_datas.table.data"),
      dataIndex: 'data',
      key: 'foreign_raw_datas.data',
      sorter: true,
      fixed: 'left',
      render: (data: any) => {
        console.log(typeof data)
        let result = [];
        for (let key in data) {
          let element: string;
          switch(typeof data[key]) {
            case 'string': {
              element = data[key];
              break;
            };
            case 'object': {
              if (Array.isArray(data[key]) && typeof data[key][0] == 'string') element = data[key].join(";");
              else {
                
              }
            }
          }
          result.push(
            <Typography>
              <Row>
                <Col span={8}>{key}</Col>
                <Col span={12}>{element}</Col>
              </Row>
            </Typography>
          )
        }
        return result;
      }
    },
  ]

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

      values.filters.push({
        field: key,
        operator: operator, // =, contains
        value: filter[key]
      });
    }
    if (!values.filters.length) { setLoading(false); return null };
    if (!values.pageSize) values.pageSize = 5;
    if (!values.sorting.length) {
      values.sorting = [
        { field: "createdAt", direction: "desc" },
      ];
    }
    let [error, result]: [any, VNWarehouse[]] = await to(foreignRawDataSerivce().withAuth().index(values));
    setLoading(false);
    if (error) {
      const { code, message } = error
      notify(t(`errors:${code}`), t(message), 'error')
      return {}
    }
    return result;
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
    if (!values) return null;
    setFilter(values);
    isFiltered = values;
    tableRef.current.reload(values);
  }

  return <>
    <div className="content">
      {/* <Button hidden={!createPer}
        onClick={() => redirect("frontend.admin.foreign_raw_datas.create")}
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
    title={t("pages:foreign_raw_datas.index.title")}
    description={t("pages:foreign_raw_datas.index.description")}
    {...props}
  />
}

Index.permissions = {
  "foreign_raw_datas": "R"
};

export default Index
