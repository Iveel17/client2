import React from 'react';
import './AuthSection.css';
import ButtonB from '../../../../components/common/buttons/ButtonB';
import ButtonA from '../../../../components/common/buttons/ButtonA';

const AuthSection = () => {
    return (
                <div className="auth-buttons">
                    <ButtonA text="Log In" to='/login'/>
                    <ButtonB text="Join Us" to='/signup'/>
                </div>
)};
export default AuthSection;