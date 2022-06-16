import React from "react";
import { Route, Routes } from "react-router-dom";
import { allRoutes } from "./navigationPaths";
import ProtectedRoute from "./ProtectedRoute";

export const AppRouter = () => {
  const routeComponents = allRoutes.map((route, index) => {
    if (route.authRequired) {
      return <Route path={route.path} element={<ProtectedRoute>{route.component}</ProtectedRoute>} key={index} />;
    }
    return <Route path={route.path} element={route.component} key={index} />;
  });

  return <Routes>{routeComponents}</Routes>;
};
