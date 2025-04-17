"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarProvider = ({ children }) => {
  return (
    <>
      <ProgressBar
        height="4px"
        color="red"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};
export default ProgressBarProvider;
