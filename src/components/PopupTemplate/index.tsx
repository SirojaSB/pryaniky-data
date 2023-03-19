import styles from "./PopupTemplate.module.scss";
import {Button, TextField} from "@mui/material";
import React, {FormEvent} from "react";

type PopupTemplateProps ={
    onClickClose: (arg: boolean) => void;
    errors: {[p: string]: string};
    values: {[p: string]: string};
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isValid: boolean,
    onSubmit: () => Promise<void>
}

const PopupTemplate: React.FC<PopupTemplateProps> = ({
        onClickClose,
        errors,
        values,
        handleChange,
        isValid,
        onSubmit
    }) => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit()
        onClickClose(false)
    }

    return (
        <div onClick={() => onClickClose(false)} className={styles.popup}>
            <div onClick={e => e.stopPropagation()} className={styles.popupContent}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        error={!!errors.documentName}
                        required
                        sx={{ mb: '10px', width: '300px' }}
                        label="Имя документа"
                        name="documentName"
                        helperText={errors.documentName}
                        variant="standard"
                        value={values.documentName}
                        onChange={handleChange}
                    />
                    <TextField
                        error={!!errors.documentType}
                        required
                        sx={{ mb: '10px', width: '300px' }}
                        label="Тип документа"
                        name="documentType"
                        helperText={errors.documentType}
                        variant="standard"
                        value={values.documentType}
                        onChange={handleChange}
                    />
                    <TextField
                        error={!!errors.documentStatus}
                        required
                        sx={{ mb: '10px', width: '300px' }}
                        label="Статус"
                        name="documentStatus"
                        helperText={errors.documentStatus}
                        variant="standard"
                        value={values.documentStatus}
                        onChange={handleChange}
                    />
                    <TextField
                        error={!!errors.employeeNumber}
                        required
                        sx={{ mb: '10px', width: '300px' }}
                        label="Число сотрудников"
                        name="employeeNumber"
                        helperText={errors.employeeNumber}
                        variant="standard"
                        value={values.employeeNumber}
                        onChange={handleChange}
                    />
                    <TextField
                        error={!!errors.employeeSignatureName}
                        required
                        sx={{ mb: '10px', width: '300px' }}
                        label="Подписи сотрудников"
                        name="employeeSignatureName"
                        helperText={errors.employeeSignatureName}
                        variant="standard"
                        value={values.employeeSignatureName}
                        onChange={handleChange}
                    />
                    <TextField
                        error={!!errors.employeeSigDate}
                        required
                        sx={{ mb: '10px', width: '300px' }}
                        label="Дата подписания"
                        name="employeeSigDate"
                        helperText={errors.employeeSigDate}
                        variant="standard"
                        value={values.employeeSigDate}
                        onChange={handleChange}
                    />
                    <TextField
                        error={!!errors.companySignatureName}
                        required
                        sx={{ mb: '10px', width: '300px' }}
                        label="Подпись компании"
                        name="companySignatureName"
                        helperText={errors.companySignatureName}
                        variant="standard"
                        value={values.companySignatureName}
                        onChange={handleChange}
                    />
                    <TextField
                        error={!!errors.companySigDate}
                        required
                        sx={{ mb: '10px', width: '300px' }}
                        label="Дата подписания"
                        name="companySigDate"
                        helperText={errors.companySigDate}
                        variant="standard"
                        value={values.companySigDate}
                        onChange={handleChange}
                    />
                    <Button type='submit' variant="contained" disabled={!isValid}>Сохранить</Button>
                    <Button className={styles.popupClose} type="button" aria-label="Закрыть карточку" onClick={() => onClickClose(false)} variant="contained">Отмена</Button>
                </form>
            </div>
        </div>
    )
}

export default PopupTemplate
