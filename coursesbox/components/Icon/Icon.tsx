import React, {FC} from "react";
import styled from "@emotion/styled";
import {Icons} from "@/components/Icon/Icons";
import {css} from "@emotion/react";

export type AvailableIcons = keyof  typeof Icons;

type WrapperProps = {
    /** Icon width and height **/
    size?: number;
}

export type Props = {
    /** Icon name **/
    name: AvailableIcons;
} & WrapperProps & React.SVGProps<SVGSVGElement>

const Wrapper = styled.div<WrapperProps>`
  color: ${({theme}) => theme.font.regular};
  ${({size}) => {
      const sizeRem = `${size}rem`;
      return css`
        width: ${sizeRem};
        height: ${sizeRem};
      `;
  }}
`;

export const Icon: FC<Props> = ({name, size = 2, ...rest}) => {
    const Icon = Icons[name];
    const sizeInRem = `${size}rem`;
    const sizes = {width: sizeInRem, height: sizeInRem};
    return (
        <Wrapper size={size}>
            <Icon {...sizes} {...rest} />
        </Wrapper>
    )
};
