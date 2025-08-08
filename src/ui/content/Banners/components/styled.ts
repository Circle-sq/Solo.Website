import styled from '@emotion/styled';

import { fontWeight, radius, GenericColors, Opacities } from '@solo-ui/system';

import Button from 'src/ui/common/Button/Button';

export const S_BannersContainer = styled.div`
    overflow: hidden;
    background-color: ${GenericColors.black + Opacities.opacity90};
    border-radius: ${radius.main};

    .swiper-slide:not(.swiper-slide-active) > a {
        opacity: 0.095;
        pointer-events: none;
    }

    .swiper-slide:only-child {
        margin: auto;
    }
`;

export const SlideAnchor = styled.a`
    overflow: hidden;
    position: relative;
    display: block;
    opacity: 1;
    transition: 350ms ease-in;
`;

export const Image = styled.img`
    width: 100%;
    height: auto;
`;

export const Overlay = styled.div`
    background-repeat: repeat-x;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 60%;
    background-color: ${GenericColors.transparent};
    background-image: linear-gradient(to right, ${GenericColors.black} 0, ${GenericColors.transparent} 100%);
`;

export const Content = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 42px 0;
    color: ${GenericColors.white};
`;

export const Title = styled.h4`
    font-size: 28px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    white-space: normal;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: ${fontWeight.bold};
`;

export const Description = styled.div`
    font-size: 18px;
    margin-top: 5px;
    overflow: hidden;
    white-space: normal;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

export const ActionButton = styled(Button)`
    margin-top: 10px;
`;
