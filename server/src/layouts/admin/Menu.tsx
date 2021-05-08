
import React, { useState, useEffect } from 'react';
import { Menu, Spin } from 'antd';
const { SubMenu } = Menu
import sidebar from './slidebar.config'
import useBaseHook from '@src/hooks/BaseHook'
import Link from 'next/link';
import useSWR from 'swr'
import usePermissionHook from '@src/hooks/PermissionHook'
import { makeUrl, getSidebarSelecteds, getRouteData } from '@src/helpers/routes'
import auth from '@src/helpers/auth'

const MenuComponent = (props: any) => {
  const { user } = auth()
  const { theme, onCollapseChange, isMobile, tReady, ...otherProps } = props
  const { router, t } = useBaseHook({ lang: ['menu'] })
  const { checkPermission } = usePermissionHook()
  const [routerNames, setRouterNames] = useState(undefined)
  const { data: routeData } = useSWR(["getRouteData"], () => getRouteData());
  const getRouteName = () => {
    const routePath = router.pathname
    for (let routeName in routeData) {
      let routeElement = routeData[routeName]
      if (!routeElement.action) continue;
      if (routeElement.action.substr(5) === routePath) return routeName
    }
  }

  const currentRouteName = getRouteName()
  const { data: breadcums } = useSWR(Object.values(routeData || {}).length ? ["getSidebarSelecteds", currentRouteName, sidebar, routeData] : null, () => getSidebarSelecteds(currentRouteName, sidebar, routeData));
  useEffect(() => {
    let routerNamesT = (breadcums || []).map((breadcum: any) => breadcum.routeName)
    setRouterNames(routerNamesT)
  }, [breadcums])

  const generateMenus = (data: any) => {
    return data.map((item: any) => {
      if (item.children) {
        if (item.type === "group") {
          let children = generateMenus(item.children)
          if (!children.length) return;
          return (
            <Menu.ItemGroup
              key={item.routeName}
              title={
                <>
                  {item.icon ? item.icon : ''}
                  <span>{t(item.routeName)}</span>
                </>
              }
            >
              {children}
            </Menu.ItemGroup>
          );
        }
        else {
          let children = generateMenus(item.children)
          if (!children.length) return;
          return (
            <SubMenu
              key={item.routeName}
              title={
                <>
                  {item.icon ? item.icon : ''}
                  <span>{t(item.routeName)}</span>
                </>
              }
            >
              {children}
            </SubMenu>
          );
        }
      }

      if(!["admin"].includes(user.type) && item.routeName === "frontend.admin.dashboard.index") return
      if (!checkPermission(item.permissions)) return
      let routeInfo = makeUrl(item.routeName, item.routeParams, routeData || {})
      const routeLang = {
        href: routeInfo.href || "",
        as: routeInfo.as || ""
      }
      return (
        <Menu.Item key={item.routeName}>
          <Link {...routeLang} >
            <a href={routeLang.as}>
              {item.icon ? item.icon : ''}
              <span>{t(item.routeName)}</span>
            </a>
          </Link>
        </Menu.Item>
      );
    }).filter((menu: any) => menu);
  }

  if(!routerNames || routerNames.length == 0) return <Spin className="spin" />
  return <Menu
    mode="inline"
    theme={theme}
    className="side-bar"
    defaultOpenKeys={routerNames}
    selectedKeys={[...routerNames].pop()}
    onClick={
      isMobile
        ? () => {
          onCollapseChange(true)
        }
        : undefined
    }
    {...otherProps}
  >
    {generateMenus(sidebar)}
  </Menu>
}

export default MenuComponent
