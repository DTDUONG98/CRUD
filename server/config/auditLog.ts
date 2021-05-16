const baseObj = {
  "highLevel": "username",
  "detailLevel": ""
}

const baseCRUD = {
  "store": {
    ...baseObj,
    "action": "Store",
    "highLevel": "name"
  },
  "update": {
    ...baseObj,
    "action": "Update",
    "highLevel": "name",
    "detailLevel": {}
  },
  "destroy": {
    ...baseObj,
    "action": "Destroy",
    "highLevel": "name"
  },
  "delete": {
    ...baseObj,
    "action": "Delete",
    "highLevel": "names"
  }
}

export default {
  "auth": {
    "controller": "Login",
    "items": {
      "login": {
        ...baseObj,
        "action": "Login"
      },
      "logout": {
        ...baseObj,
        "action": "Logout"
      },
      "changePassword": {
        ...baseObj,
        "action": "ChangePassword"
      },
      "forgotPassword": {
        ...baseObj,
        "action": "ForgotPassword"
      }
    }
  },
  "otpLogin": {
    ...baseObj,
    "controller": "Login",
    "action": "SubmitOTP"
  },
  "group": {
    "controller": "Group Management",
    "items": {
      ...baseCRUD,
      "update": {
        ...baseCRUD['update'],
        "detailLevel": {
          fields: {
            'code': "string",
            'name': "string",
            'description': "string"
          }
        }
      }
    }
  },
  "admin": {
    "controller": "Account Management",
    "items": {
      "store": {
        ...baseCRUD['store'],
        "highLevel": "username"
      },
      "update": {
        ...baseCRUD['update'],
        "highLevel": "username",
        "detailLevel": {
          fields: {
            'username': "string",
            'firstName': "string",
            'lastName': "string",
            'email': "string"
          }
        }
      },
      "destroy": {
        ...baseCRUD['destroy'],
        "highLevel": "username"
      },
      "delete": {
        ...baseCRUD['delete'],
       "highLevel": "usernames"
      },

      "submitOTP": {
        ...baseObj,
        "action": "SubmitOTP"
      }
    }
  },
  "bot": {
    ...baseObj,
    "controller": "DNC Account",
    "action": "",
    "highLevel": {
      0: "{{botName}} bot down",
      1: "{{botName}} bot up"
    }
  },
  "cdr": {
    "controller": "CDR",
    "items": {
      "exportExcel": {
        ...baseObj,
        "highLevel": "CDR excel downloaded",
        "action": "Export Excel"
      }
    }
  },
  "setting": {
    "controller": "Money Threshold",
    "items": {
      "update": {
        ...baseObj,
        "highLevel": "value",
        "action": "Update"
      }
    }
  },
  "mno": {
    "controller": "MNO DB",
    "items": {
      "store": {
        ...baseObj,
        "action": "Store",
        "highLevel": {
          0: "Small Number Upload",
          1: "Bulk Number Upload - Append",
          2: "Bulk Number Upload - Replace"
        },
        "detailLevel": "Number of uploads: {{data}}"
      }
    }
  },
  "agent": {
    "controller": "Agent Number",
    "items": {
      "store": {
        ...baseCRUD['store'],
        "highLevel": {
          0: "Small Number Upload",
          1: "Bulk Number Upload - Append",
          2: "Bulk Number Upload - Replace"
        },
        "detailLevel": {
          0: "Number of inserts: {{inserted}}, Number of deletes: {{deleted}}, Number of errors (Invalid, Not Found, Duplicate): {{errors}}",
          1: "Number of inserts: {{inserted}}, Number of deletes: {{deleted}}, Number of errors (Invalid, Not Found, Duplicate): {{errors}}",
          2: "Number of inserts: {{inserted}}, Number of deletes: {{deleted}}, Number of errors (Invalid, Not Found, Duplicate): {{errors}}"
        }
      },
      "update": {
        ...baseCRUD['update'],
        "highLevel": "phoneNumber",
        "detailLevel": {
          fields: {
            "phoneNumber": "string"
          }
        }
      },
      "destroy": {
        ...baseCRUD['destroy'],
        "highLevel": "phoneNumber"
      },
      "delete": {
        ...baseCRUD['delete'],
        "highLevel": "phoneNumbers"
      }
    }
  },
  "blacknumber": {
    "controller": "Blacklist",
    "items": {
      "store": {
        ...baseObj,
        "action": "Store",
        "highLevel": {
          0: "Small Number Upload",
          1: "Bulk Number Upload - Append",
        },
        "detailLevel": {
          0: "Number of inserts: {{inserted}}, Number of deletes: {{deleted}}, Number of errors (Invalid, Not Found, Duplicate, Redundant in Whitelist): {{errors}}",
          1: "Number of inserts: {{inserted}}, Number of deletes: {{deleted}}, Number of errors (Invalid, Not Found, Duplicate, Redundant in Whitelist): {{errors}}"
        }
      }
    }
  },
  "whitenumber": {
    "controller": "Whitelist",
    "items": {
      "store": {
        ...baseObj,
        "action": "Store",
        "highLevel": {
          0: "Small Number Upload",
          1: "Bulk Number Upload - Append",
        },
        "detailLevel": {
          0: "Number of inserts: {{inserted}}, Number of deletes: {{deleted}}, Number of errors (Invalid, Not Found, Duplicate, Redundant in Blacklist): {{errors}}",
          1: "Number of inserts: {{inserted}}, Number of deletes: {{deleted}}, Number of errors (Invalid, Not Found, Duplicate, Redundant in Blacklist): {{errors}}"
        }
      }
    }
  }
}
