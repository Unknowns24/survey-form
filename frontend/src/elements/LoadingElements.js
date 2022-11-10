import styled from "styled-components"

export const LoadingTitle = styled.h2`
    font-size: 2rem;
    margin-bottom: 10px;

    @media screen and (max-width: 480px) {
        font-size: 1.5rem;
    }
`

export const LoadingContainer = styled.div`
    height: 800px;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 480px) {
        height: 500px;
    }
`
