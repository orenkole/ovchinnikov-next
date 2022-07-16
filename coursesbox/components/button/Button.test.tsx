import React from "react";
import { screen} from "@testing-library/react";
import {Button} from "./Button";
import userEvent from "@testing-library/user-event";
import {render} from "../../test-utils";

describe("Button test cases", () => {
    it("Render check", () => {
        const onClick = jest.fn();
        const { asFragment } = render(<Button onClick={onClick}>
            Button
        </Button>)

        expect(asFragment()).toMatchSnapshot();
    })

    it("Check onClick callbck", () => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}>Button</Button>)
        screen.debug();
        const element = screen.getByRole('button');
        userEvent.click(element);
        expect(onClick).toHaveBeenCalled();
    })
})
