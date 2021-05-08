interface RoleGroup {
  id: number;
  name: string;
  description: string;
  parentId: number;
  createdAt: string;
}

interface Group {
  id: number;
  name: string;
  description: string;
  parentId: number;
  roleGroupId: number;
  createdAt: string;
}

interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  groupId: number;
  createdAt: string;
  twofaSecret: string;
}

interface AdminPermission {
  id?: number;
  name: string;
  description: string;
  value?: number;
  key: string;
  createdAt: string;
}

interface Agent {
  id?: number;
  phoneNumber: string;
}

interface Setting {
  id?: number;
  name: string;
  description: string;
  value: any
}

interface DNCAccount {
  id?: number;
  uen: string;
  corpPassId: string;
  password: string;
  emails: string;
  enable: number;
  cookie?: string;
}

interface VNWarehouse {
  id?: any;
  name: any;
  typePrice: any;
  declarationDate: any;
  petition: any;
  activeIngredient: any;
  strength: any;
  registerCode: any;
  form: any;
  package: any;
  unit: any;
  price: any;
  priceCIF: any;
  company: any;
  dicisionCode: any;
  priceTotal: any;
  class: any;
  createAt: any;
  updateAt: any;
}