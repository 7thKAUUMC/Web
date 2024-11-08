import React from 'react';
import * as S from './SkeletonCard.style.js';

const SkeletonCard = () => {
    return (
        <S.Card>
            <S.ImagePlaceholder />
            <S.TitlePlaceholder />
            <S.DatePlaceholder />
        </S.Card>
    );
};

export default SkeletonCard; 