import {ComponentStoryObj, ComponentMeta} from "@storybook/react";
import {expect} from "@storybook/jest";
import {screen} from "@storybook/testing-library";
import {Tile} from "./TIle"

export default {
    title: "Content/Tile",
    component: Tile,
} as ComponentMeta<typeof Tile>

export const BasicTile: ComponentStoryObj<typeof Tile> = {
    play: async ({args}) => {
        await expect(screen.getByRole('heading')).toBeInTheDocument();
    },
    args: {
        header: 'Lorem ipsum dolor sit amet',
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
}
