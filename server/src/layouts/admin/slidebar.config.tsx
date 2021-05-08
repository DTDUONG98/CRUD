import {
  HomeOutlined, UserOutlined, TeamOutlined, AndroidOutlined,
  FieldNumberOutlined, CloudUploadOutlined, FieldBinaryOutlined,
  UnorderedListOutlined, CheckSquareOutlined, AuditOutlined, SettingOutlined
} from "@ant-design/icons";

const sidebar = [
  {
    routeName: "frontend.admin.dashboard.index",
    icon: <HomeOutlined />,
    routeParams: {},
  },
  {
    routeName: "frontend.admin.admins.title",
    icon: <UserOutlined />,
    type: "sub",
    routeParams: {},
    children: [
      {
        routeName: "frontend.admin.groups.index",
        icon: <TeamOutlined />,
        routeParams: {},
        permissions: {
          groups: "R",
        },
      },
      {
        routeName: "frontend.admin.admins.index",
        icon: <UserOutlined />,
        routeParams: {},
        permissions: {
          admins: "R",
        },
      },
      // {
      //   routeName: "frontend.admin.roleGroups.index",
      //   icon: <TeamOutlined />,
      //   routeParams: {},
      //   permissions: {
      //     "roleGroups": "R",
      //   },
      // },
      {
        routeName: "frontend.admin.admins.twofa",
        icon: <UserOutlined />,
        routeParams: {},
        permissions: {
          admins: "R",
        },
      },
    ],
  },
  {
    routeName: "frontend.admin.blackNumbers.index",
    icon: <FieldNumberOutlined />,
    routeParams: {},
    permissions: {
      blackNumbers: "R",
    },
  },
  {
    routeName: "frontend.admin.whiteNumbers.index",
    icon: <FieldBinaryOutlined />,
    routeParams: {},
    permissions: {
      whiteNumbers: "R",
    },
  },
  {
    routeName: "frontend.admin.mnoDB.index",
    icon: <CloudUploadOutlined />,
    routeParams: {},
    permissions: {
      mnoDB: "R",
    },
  },
  {
    routeName: "frontend.admin.agents.index",
    icon: <UnorderedListOutlined />,
    routeParams: {},
    permissions: {
      agents: "R",
    },
  },
  {
    routeName: "frontend.admin.dncAccounts.index",
    icon: <AndroidOutlined />,
    routeParams: {},
    permissions: {
      dncAccounts: "R",
    },
  },
  {
    routeName: "frontend.admin.cdrs.index",
    icon: <CheckSquareOutlined />,
    routeParams: {},
    permissions: {
      cdrs: "R",
    },
  },
  {
    routeName: "frontend.admin.auditLogs.index",
    icon: <AuditOutlined />,
    routeParams: {},
    permissions: {
      auditLogs: "R",
    },
  },
  {
    routeName: "frontend.admin.settings.index",
    icon: <SettingOutlined />,
    routeParams: {},
    permissions: {
      settings: "R",
    },
  },
  {
    routeName: "frontend.admin.vn_raw_datas.title",
    icon: <HomeOutlined />,
    type: "sub",
    routeParams: {},
    children: [
      {
        routeName: "frontend.admin.vn_raw_datas.index",
        icon: <HomeOutlined />,
        routeParams: {},
        permissions: {
          vn_raw_datas: "R",
        },
      },
      // {
      //   routeName: "frontend.admin.vn_raw_datas.create",
      //   icon: <UserOutlined />,
      //   routeParams: {},
      //   permissions: {
      //     "vn_raw_datas": "C",
      //   },
      // },
      // {
      //   routeName: "frontend.admin.vn_raw_datas.edit",
      //   icon: <TeamOutlined />,
      //   routeParams: {},
      //   permissions: {
      //     "vn_raw_datas": "U",
      //   },
      // },
      // {
      //   routeName: "frontend.admin.vn_raw_datas.delete",
      //   icon: <UserOutlined />,
      //   routeParams: {},
      //   permissions: {
      //     "vn_raw_datas": "R",
      //   },
      // },
    ],
  },
  {
    routeName: "frontend.admin.foreign_raw_datas.title",
    icon: <HomeOutlined />,
    type: "sub",
    routeParams: {},
    children: [
      {
        routeName: "frontend.admin.foreign_raw_datas.index",
        icon: <HomeOutlined />,
        routeParams: {},
        permissions: {
          foreign_raw_datas: "R",
        },
      },
      // {
      //   routeName: "frontend.admin.vn_raw_datas.create",
      //   icon: <UserOutlined />,
      //   routeParams: {},
      //   permissions: {
      //     "vn_raw_datas": "C",
      //   },
      // },
      // {
      //   routeName: "frontend.admin.vn_raw_datas.edit",
      //   icon: <TeamOutlined />,
      //   routeParams: {},
      //   permissions: {
      //     "vn_raw_datas": "U",
      //   },
      // },
      // {
      //   routeName: "frontend.admin.vn_raw_datas.delete",
      //   icon: <UserOutlined />,
      //   routeParams: {},
      //   permissions: {
      //     "vn_raw_datas": "R",
      //   },
      // },
    ],
  },
  {
    routeName: "frontend.admin.vn_warehouses.title",
    icon: <HomeOutlined />,
    type: "sub",
    routeParams: {},
    children: [
      {
        routeName: "frontend.admin.vn_warehouses.index",
        icon: <HomeOutlined />,
        routeParams: {},
        permissions: {
          vn_warehouses: "R",
        },
      },
      
      // {
      //   routeName: "frontend.admin.vn_warehouses.create",
      //   icon: <UserOutlined />,
      //   routeParams: {},
      //   permissions: {
      //     "vn_warehouses": "C",
      //   },
      // },
      // {
      //   routeName: "frontend.admin.vn_warehouses.edit",
      //   icon: <TeamOutlined />,
      //   routeParams: {},
      //   permissions: {
      //     "vn_warehouses": "U",
      //   },
      // },
      // {
      //   routeName: "frontend.admin.admins.delete",
      //   icon: <UserOutlined />,
      //   routeParams: {},
      //   permissions: {
      //     "vn_warehouses": "R",
      //   },
      // },
    ],
  },
  {
    routeName: "frontend.admin.foreign_warehouses.title",
    icon: <HomeOutlined />,
    type: "sub",
    routeParams: {},
    children: [
      {
        routeName: "frontend.admin.foreign_warehouses.index",
        icon: <HomeOutlined />,
        routeParams: {},
        permissions: {
          foreign_warehouses: "R",
        },
      },
      {
        routeName: "frontend.admin.foreign_warehouses.compare_price",
        icon: <HomeOutlined />,
        routeParams: {},
        permissions: {
          foreign_warehouses: "R",
        }
      }
    ],
  },
];

export default sidebar;
