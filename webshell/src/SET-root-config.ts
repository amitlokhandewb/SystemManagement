import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const userToken = localStorage.getItem("Token");

const routesConfig = `
<single-spa-router>
  <main>
    ${
      userToken
        ? `
    <route default>
      <application name="@SET/appbar"></application>
      <div style="display: flex">
        <application name="@SET/sidebar"></application>
        <div style="display: flex">
          <application name="@SET/monitor"></application>
          <application name="@SET/assetinventory"></application>
        </div>
      </div>
    </route>
    <route path="admin">
    <application name="@SET/appbar"></application>
      <div style="display: flex">
        <application name="@SET/sidebar"></application>
        <div style="display: flex">
          <application name="@SET/admin"></application>
        </div>
      </div>
    </route>
    <route path="maintainance-event">
      <application name="@SET/appbar"></application>
      <div style="display: flex">
        <application name="@SET/sidebar"></application>
        <div style="display: flex">
          <application name="@SET/eventList"></application>
        </div>
      </div>
    </route>`
        : ""
    }
    <route path="login">
      <application name="@SET/login"></application>
    </route>
    <route path="register">
      <application name="@SET/register"></application>
    </route>
  </main>
</single-spa-router>
`;

const routes = constructRoutes(routesConfig);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
