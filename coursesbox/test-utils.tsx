import { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";

import { Themes } from "./styles/themes";

const customRender = (
    ui: ReactElement,
    options?: RenderOptions
) => {
    const Wrapper: FC = ({ children }) => (
        <ThemeProvider theme={Themes.light}>{children}</ThemeProvider>
    );
    return render(ui, { wrapper: Wrapper, ...options });
};

export {customRender as render};
