// https://umijs.org/config/
import {defineConfig, utils} from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import webpackPlugin from './plugin.config';

const {winPath} = utils; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const {ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV, GA_KEY} = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  analytics: GA_KEY
    ? {
      ga: GA_KEY,
    }
    : false,
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },

            {
              path: '/dashboard',
              redirect: '/dashboard/analysis',
              authority: ['admin'],
            },
            {
              name: 'calendar',
              icon: 'table',
              path: '/calendar',
              routes: [
                {
                  name: 'equipmentCalendar',
                  icon: 'smile',
                  path: '/calendar/equipmentcalendar',
                  component: './schedule/equipmentCalendar',
                }
              ],
            },
            {
              name: 'schedule',
              icon: 'table',
              path: '/schedule',
              routes: [
                {
                  name: 'testingSchedule',
                  icon: 'smile',
                  path: '/schedule/testScheduling',
                  component: './schedule/TestScheduling',
                },
                {
                  name: 'testItemNormal',
                  icon: 'smile',
                  path: '/schedule/testitemnormal',
                  component: './schedule/TestItemNormal',
                },
                {
                  name: 'testContainer',
                  icon: 'smile',
                  path: '/schedule/testContainer',
                  component: './schedule/TestContainer',
                }
              ],
            },
            {
              name: 'scribingSchedule',
              icon: 'table',
              path: '/scribingSchedule',
              routes: [
                {
                  name: 'ScribingNormal',
                  icon: 'smile',
                  path: '/scribingSchedule/ScribingNormal',
                  component: './schedule/ScribingNormal',
                },
                {
                  name: 'ScribingNoTest',
                  icon: 'smile',
                  path: '/scribingSchedule/ScribingNoTest',
                  component: './schedule/ScribingNoTest',
                },
                {
                  name: 'ScribingSchedule',
                  icon: 'smile',
                  path: '/scribingSchedule/ScribingSchedule',
                  component: './schedule/ScribingSchedule',
                },
                {
                  name: 'ScribingNoStock',
                  icon: 'smile',
                  path: '/scribingSchedule/ScribingNoStock',
                  component: './schedule/ScribingNoStock',
                }
              ],
            },
            {
              name: 'PickingSchedule',
              icon: 'table',
              path: '/pickingSchedule',
              routes: [
                {
                  name: 'PickingItemNormal',
                  icon: 'smile',
                  path: '/pickingSchedule/PickingItemNormal',
                  component: './schedule/PickingItemNormal',
                },
                {
                  name: 'PackingItemOrder',
                  icon: 'smile',
                  path: '/pickingSchedule/PackingItemOrder',
                  component: './schedule/PackingItemOrder',
                },
                {
                  name: 'PackingItemEmpty',
                  icon: 'smile',
                  path: '/pickingSchedule/PackingItemEmpty',
                  component: './schedule/PackingItemEmpty',
                },
                {
                  name: 'PackingItem',
                  icon: 'smile',
                  path: '/pickingSchedule/PackingItem',
                  component: './schedule/PackingItem',
                }

              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }

        const match = context.resourcePath.match(/src(.*)/);

        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }

        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy['pre'],
  chainWebpack: webpackPlugin,
});

/*
{
              path: '/dashboard',
              redirect: '/dashboard/analysis',
              authority: ['admin'],
            },
            {
              name: 'calendar',
              icon: 'table',
              path: '/calendar',
              routes: [
                {
                  name: 'equipmentCalendar',
                  icon: 'smile',
                  path: '/calendar/equipmentcalendar',
                  component: './schedule/equipmentCalendar',
                }
              ],
            },
            {
              name: 'schedule',
              icon: 'table',
              path: '/schedule',
              routes: [
                {
                  name: 'testingSchedule',
                  icon: 'smile',
                  path: '/schedule/testScheduling',
                  component: './schedule/TestScheduling',
                },
                {
                  name: 'testItemNormal',
                  icon: 'smile',
                  path: '/schedule/testitemnormal',
                  component: './schedule/TestItemNormal',
                },
                {
                  name: 'testContainer',
                  icon: 'smile',
                  path: '/schedule/testContainer',
                  component: './schedule/TestContainer',
                }
              ],
            },
            {
              name: 'scribingSchedule',
              icon: 'table',
              path: '/scribingSchedule',
              routes: [
                {
                  name: 'ScribingNormal',
                  icon: 'smile',
                  path: '/scribingSchedule/ScribingNormal',
                  component: './schedule/ScribingNormal',
                },
                {
                  name: 'ScribingNoTest',
                  icon: 'smile',
                  path: '/scribingSchedule/ScribingNoTest',
                  component: './schedule/ScribingNoTest',
                },
                {
                  name: 'ScribingSchedule',
                  icon: 'smile',
                  path: '/scribingSchedule/ScribingSchedule',
                  component: './schedule/ScribingSchedule',
                }
              ],
            },
 */
