import React from "react";
import useFormWithValidation from "../../utils/useFormWithValidation";
import {RowsInfoType} from "../../pages/MainPage";
import PopupTemplate from "../PopupTemplate";
import {createRow} from "../../utils/TableApi";

type RowCreatePopupProps = {
    onClickClose: (arg: boolean) => void;
    setRowsInfo: ({...args}: RowsInfoType[]) => void;
    rowsInfo: RowsInfoType[]
}

const RowCreatePopup: React.FC<RowCreatePopupProps> = ({onClickClose, setRowsInfo, rowsInfo}) => {
    const initValues = {
        documentName: '',
        documentType: '',
        documentStatus: '',
        employeeNumber: '',
        employeeSignatureName: '',
        employeeSigDate: '',
        companySignatureName: '',
        companySigDate: '',
    }

    const {values, errors, isValid, handleChange} = useFormWithValidation(initValues, initValues)

    const createNewRow = async () => {
        const token = localStorage.getItem('JWT')
        try {
            if (token) {
                const newRow = await createRow<RowsInfoType>(token, {
                    documentName: values.documentName,
                    documentType: values.documentType,
                    documentStatus: values.documentStatus,
                    employeeNumber: values.employeeNumber,
                    employeeSignatureName: values.employeeSignatureName,
                    employeeSigDate: new Date(values.employeeSigDate).toISOString(),
                    companySignatureName: values.companySignatureName,
                    companySigDate: new Date(values.companySigDate).toISOString(),
                })
                setRowsInfo([...rowsInfo, newRow])
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <PopupTemplate
            onClickClose={onClickClose}
            errors={errors}
            values={values}
            handleChange={handleChange}
            isValid={isValid}
            onSubmit={createNewRow}
        />
    )
}

export default RowCreatePopup
