import React from "react";
import * as S from './style';

import logo from '../../assets/logo.svg';

export default () => {

  return (
    <S.Container>
      <S.Logo src={logo} alt="Agrotis" />
    </S.Container>
  );
}