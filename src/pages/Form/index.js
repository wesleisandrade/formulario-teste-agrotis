import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ptBR from "date-fns/locale/pt-BR";

import Header from "../../components/Header";
import resetImage from '../../assets/reset.svg';

import * as S from './style';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const dataPropriedade = [
  { id: 1234, cnpj: "04.909.987/0001-89", nome: "Agrotis 1" },
  { id: 1235, cnpj: "04.909.987/0001-88", nome: "Agrotis 2" },
  { id: 1236, cnpj: "04.909.987/0001-87", nome: "Agrotis 3" },
  { id: 1237, cnpj: "04.909.987/0001-86", nome: "Agrotis 4" },
  { id: 1238, cnpj: "04.909.987/0001-85", nome: "Agrotis 5" },
]
const dataLaboratorio = [
  { id: 1, nome: "Agro Skynet" },
  { id: 2, nome: "Umbrella Agro" },
  { id: 3, nome: "Osborn Agro" },
  { id: 4, nome: "Skyrim Agro" },
  { id: 5, nome: "Agro Brasil" },
]

const formDataIn = {
  nome: '',
  dataInicial: null,
  dataFinal: null,
  infosPropriedade: {},
  cnpj: '',
  laboratorio: {},
  observacoes: ''
}

export default function Form() {

  const { register, handleSubmit, setValue, reset } = useForm();

  const [open, setOpen] = useState(false);
  const [send, setSend] = useState(false);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [propriedade, setPropriedade] = useState('');
  const [laboratorio, setLaboratorio] = useState('');

  const onSubmit = data => {
    console.log(JSON.stringify(data));
    setOpen(true);
    setSend(true);
  }

  const handlePropriedade = (e) => {
    let selected = dataPropriedade[e.target.value];
    setPropriedade(e.target.value, e.target.value);
    setValue('infosPropriedade', { id: selected.id, nome: selected.nome });
    setValue('cnpj', selected.cnpj);
  }
  const handleLaboratorio = (e) => {
    let selected = dataLaboratorio[e.target.value];
    setLaboratorio(e.target.value, e.target.value);
    setValue('laboratorio', selected);
  }

  const handleClose = () => {
    setOpen(false);
  }
  const handleReset = () => {
    setDateStart(null);
    setDateEnd(null);
    setPropriedade('');
    setLaboratorio('');
    reset(formDataIn);
    setSend(false);
  }

  return (
    <S.Container>
      <Header />

      {/* Form container */}
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.FormHeader>
          <S.FormHeaderTitle>Teste front-end</S.FormHeaderTitle>
          <S.FormHeaderButton type="submit">Salvar</S.FormHeaderButton>
        </S.FormHeader>

        {/* Form content */}
        <S.FormContent>
          <S.ContentLeft>
            <FormControl variant="standard" margin="dense">
              <TextField
                label="Nome"
                {...register("nome")}
                defaultValue=""
                variant="standard"
                required
                fullWidth
                margin="dense"
              />
            </FormControl>

            <FormControl variant="standard" margin="dense">
              <InputLabel id="propriedade-label">Propriedade</InputLabel>
              <Select
                labelId="propriedade-label"
                id="propriedade"
                value={propriedade}
                onChange={(e) => handlePropriedade(e)}
                label="Propriedade *"
                fullWidth
                required
              >
                <MenuItem value=""></MenuItem>
                {dataPropriedade?.map((item, index) =>
                  <MenuItem key={index} value={index}>
                    <S.DropItemTitle>{item.nome}</S.DropItemTitle>
                    <S.DropItemSubtitle>CNPJ {item.cnpj}</S.DropItemSubtitle>
                  </MenuItem>
                )}


              </Select>
            </FormControl>
          </S.ContentLeft>

          <S.ContentRight>
            <S.FormGroupRow>
              <FormControl margin="dense">
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                  <DatePicker
                    label="Data Inicial *"
                    {...register("dataInicial")}
                    value={dateStart}
                    onChange={(newValue) => {
                      setDateStart(newValue);
                      setValue('dataInicial', newValue);
                    }}
                    renderInput={(params) =>
                      <TextField {...params}
                        variant="standard"
                        margin="dense"
                        fullWidth
                      />}
                    required
                  />
                </LocalizationProvider>
              </FormControl>

              <FormControl margin="dense">
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                  <DatePicker
                    label="Data Final *"
                    {...register("dataFinal")}
                    value={dateEnd}
                    onChange={(newValue) => {
                      setDateEnd(newValue);
                      setValue('dataFinal', newValue);
                    }}
                    renderInput={(params) =>
                      <TextField {...params}
                        variant="standard"
                        margin="dense"
                        fullWidth
                      />}
                    required
                  />
                </LocalizationProvider>
              </FormControl>
            </S.FormGroupRow>

            <FormControl variant="standard" margin="dense">
              <InputLabel id="laboratorio-label">Laboratório</InputLabel>
              <Select
                labelId="laboratorio-label"
                id="laboratorio"
                value={laboratorio}
                onChange={(e) => handleLaboratorio(e)}
                label="Laboratório *"
                required
              >
                {dataLaboratorio?.map((item, index) =>
                  <MenuItem key={index} value={index}>
                    <S.DropItemTitle>{item.nome}</S.DropItemTitle>
                  </MenuItem>
                )}

              </Select>
            </FormControl>
          </S.ContentRight>
        </S.FormContent>
        <S.FormGroupCol>
          <TextField
            label="Observações"
            {...register("observacoes")}
            defaultValue=""
            variant="standard"
            multiline
            rows={10}
            margin="dense"
            inputProps={{ maxLength: 1000 }}
          />
        </S.FormGroupCol>
      </S.FormContainer>

      {/* Btn reset form */}
      {send && <S.Reset
        src={resetImage}
        onClick={() => handleReset()}
      />}

      {/* Alert Message */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: '100%' }}

        >
          Cadastro realizado com sucesso!
        </Alert>
      </Snackbar>

    </S.Container >
  );
}