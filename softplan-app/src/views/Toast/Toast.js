/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-sort-props */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as selectorsToast from '../../store/toast/reducer';
import { messageClean } from '../../store/toast/actions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ toastData, messageClean }) => {
  useEffect(() => {
    if (toastData && toastData.show && toastData.showSucces) {
      toast.success(toastData.message);
    } else if (toastData && toastData.show && toastData.showWarning) {
      toast.warning(toastData.message);
    } else if (toastData && toastData.show && toastData.showError) {
      toast.error(toastData.message);
    }
    messageClean();
  }, [toastData, messageClean]);

  return (<ToastContainer position="bottom-right"/>);
};

Toast.propTypes = {
  toastData: PropTypes.object.isRequired,
  messageClean: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  toastData: selectorsToast.getToast(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  messageClean
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
