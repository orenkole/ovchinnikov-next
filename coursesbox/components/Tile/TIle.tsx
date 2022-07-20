import React, {FC} from "react";
import styled from "@emotion/styled";
import {borderRadius, boxShadow} from "@/components/style";

type Props = {
    children: React.ReactNode;
    header: string;
}

const Section = styled.section`
  ${({ theme }) => boxShadow(theme.components.shadow1, theme.components.shadow2)};
  ${borderRadius()};
  color: ${({theme}) => theme.font.regular};
  padding: 1vmin 4vmin 4vmin;
  background: ${({theme}) => theme.background};
`;

export const Tile: FC<Props> = ({children, header}) => {
    return <Section>
        <h2>{header}</h2>
        {children}
    </Section>
}
