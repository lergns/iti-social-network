import React, { ComponentType, Suspense } from "react";
import { Preloader } from "../components/common/Preloader/Preloader";

export function withSuspense<T>(Component: ComponentType<T>) {
  return (props: any) => {
    return (
      <Suspense fallback={<Preloader />}>
        <Component {...(props as T)} />
      </Suspense>
      // <Suspense /> will display <Preloader /> while <ProfileContainer /> is loading
    );
  };
}
