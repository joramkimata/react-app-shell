import React from 'react'
import LoadingOverlay from 'react-loading-overlay-ts'
import { PropagateLoader } from 'react-spinners'
import { PRIMARY_COLOR } from '../../utils/constants'

const LoginLoader = ({ loading, children, color = PRIMARY_COLOR }) => {
    return (
        <LoadingOverlay active={loading} spinner={<PropagateLoader color={color} />} styles={{
            overlay: (base) => ({
                ...base,
                background: 'rgba(0, 0, 0, 0.15)'
            })
        }}>
            {children}
        </LoadingOverlay>
    )
}

export default LoginLoader