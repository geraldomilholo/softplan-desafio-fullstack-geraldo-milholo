/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/jsx-max-props-per-line */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  DialogContentText,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

import { DialogDefault } from '../index';

// import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  actions: {
    justifyContent: 'flex-end'
  },
  button: {
    marginRight: 15,
    marginTop: 5
  },
  cardHeader: {
    background: '#BEBEBE'
  },
  icon: {
    padding: 3
  }
}));

const getTitle = (titles, hasRowActions) => {
  const titleCells = titles.map((t, i) => (<TableCell key={i}>{t}</TableCell>));
  if (hasRowActions) {
    titleCells.push((<TableCell key={titleCells.length}>Ações</TableCell>))
  }

  return titleCells;
}

const TableComponent = ({ rows, titles, headerTitle, deleteMessage, renderRows, hasRowActions, onEdit, onDelete, onAdd, showHeader, 
  defaultRowsPerPage, actions, hasAdd, canDelete }) => {
  
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const [rowStart, setRowStart] = useState(0);
  const [rowEnd, setRowEnd] = useState(defaultRowsPerPage);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [page, setPage] = useState(0);

  const classes = useStyles();
  
  const handlePageChange = (event, page) => {
    let start = 0;
    let end = rowsPerPage;
    if (page !== 0) {
      start = page * rowsPerPage;
      end = (page + 1) * rowsPerPage;
    } 

    setRowEnd(end);
    setRowStart(start);
    setPage(page);
  }
  const handleRowsPerPageChange = event => {
    setRowStart(0);
    setPage(0);
    setRowEnd(event.target.value);
    setRowsPerPage(event.target.value);
  }

  const getId = e => e.currentTarget.closest('tr').getAttribute('id');
  const handlerEdit = e => onEdit(getId(e));
  const handlerDelete = e => {
    setDeleteId(getId(e));
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  }

  const handlerConfirm = () => {
    onDelete(deleteId);
    setOpen(false);
    setDeleteId(null);
    setRowsPerPage(rowsPerPage);
  }

  const getActions = () => {
    return actions.map(a => 
      <IconButton key={a.key} onClick={(e) => a.onClick(getId(e))} className={classes.icon}> { a.icon } </IconButton>
    )
  }

  const getHeaderActions = () => {
    if (hasAdd) {
      return <Button
        className={classes.button}
        color="primary" 
        variant="contained" 
        onClick={onAdd}
      > 
        Novo
      </Button> 
    }
    return ''
  }

  return (
    <>
      <Card className={classes.root}>
        {showHeader ? (
          <CardHeader
            className={classes.cardHeader}
            action={getHeaderActions()}
            title={headerTitle}
          />
        ) : ''}
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  {getTitle(titles, hasRowActions)}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(rowStart, rowEnd).map(r => (
                  <TableRow hover key={r.id} id={r.id}>
                    {renderRows(r)}
                    {hasRowActions ? 
                      (<TableCell>
                        <Grid container spacing={2}>
                          <IconButton key="button-edit" onClick={handlerEdit} className={classes.icon}> <EditIcon/> </IconButton>
                          {actions ? getActions() : ''}
                          {canDelete ? <IconButton key="button-delete" onClick={handlerDelete} className={classes.icon}> <DeleteForeverIcon/> </IconButton> : ''}
                        </Grid>
                      </TableCell>) : ''
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={rows.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 15, 25]}
            labelRowsPerPage="Linhas por página"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        </CardActions>
      </Card>
      <DialogDefault
        open={open}
        handlerCancel={handleClose}
        handlerConfirm={handlerConfirm}
        title="Você tem certeza?"
        confirmMessage="Deletar"
      >
        <DialogContentText> {deleteMessage} </DialogContentText>
      </DialogDefault>
    </>
  );
};

TableComponent.propTypes = {
  deleteMessage: PropTypes.string,
  hasRowActions: PropTypes.bool,
  headerTitle: PropTypes.string,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  renderRows: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  titles: PropTypes.array.isRequired,
  showHeader: PropTypes.bool,
  defaultRowsPerPage: PropTypes.number,
  actions: PropTypes.array,
  hasAdd: PropTypes.bool,
  canDelete: PropTypes.bool
};


TableComponent.defaultProps = {
  deleteMessage: '',
  hasRowActions: false,
  headerTitle: '',
  onAdd: () => {},
  onDelete: () => {},
  onEdit: () => {},
  showHeader: true,
  defaultRowsPerPage: 10,
  hasAdd: true,
  canDelete: true
};

export default TableComponent;
