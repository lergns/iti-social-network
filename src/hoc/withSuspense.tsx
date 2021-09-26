import React, { ComponentType, Suspense } from "react";
import { Preloader } from "../components/common/Preloader/Preloader";

// WCP === wrapped component props
export function withSuspense<WCP>(WrappedComponent: ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <Suspense fallback={<Preloader />}>
        <WrappedComponent {...props} />
      </Suspense>
      // <Suspense /> will display <Preloader /> while <ProfileContainer /> is loading
    );
  };
}
