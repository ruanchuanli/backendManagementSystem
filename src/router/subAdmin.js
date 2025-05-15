
export const subAdminRoutes = [
  {
    "name": "AppIdentifier",
    "path": "/appIdentifier",
    "hidden": false,
    "redirect": "noRedirect",
    "component": "Layout",
    "alwaysShow": true,
    "meta": {
      "title": "app标识",
      "icon": "build",
      "noCache": false,
      "link": null
    },
    "children": [
      {
        "name": "subAdminAppIdentifier",
        "path": "subAdminAppIdentifier",
        "hidden": false,
        "component": "appIdentifier/subAdminAppIdentifier",
        "meta": {
          "title": "子管理员App标识",
          "noCache": false,
          "link": null
        }
      },
    ]
  },
  {
    "name": "ActivationCode",
    "path": "/activationCode",
    "hidden": true,
    "redirect": "noRedirect",
    "component": "Layout",
    "alwaysShow": true,
    "meta": {
      "title": "激活码",
      "icon": "druid",
      "noCache": false,
      "link": null
    },
    "children": [
      {
        "name": "ActivationCodeMan",
        "path": "activationCodeMan",
        "hidden": false,
        "component": "activationCode/index",
        "meta": {
          "title": "激活码管理",
          "noCache": false,
          "link": null
        }
      },
    ]
  }

]
