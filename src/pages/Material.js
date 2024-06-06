import React, { useState, useEffect } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';
import { Button, Modal, Form, Table, InputGroup, FormControl } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/Material.css';
import { useTranslation } from 'react-i18next';
const sampleData = [
    // Dữ liệu mẫu
    { no: 1, season: 'Spring', styleNumber: 'S123', workingNo: 'W001', articleNo: 'A123', quantity: 100 },
    { no: 2, season: 'Summer', styleNumber: 'S124', workingNo: 'W002', articleNo: 'A124', quantity: 200 },
];

const Material = () => {
    const [data, setData] = useState(sampleData);
    const [departments, setDepartments] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [modalType, setModalType] = useState('add');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('season');
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const initialDepartments = [
            { id: 'D001', name: 'HR' },
            { id: 'D002', name: 'Finance' },
            { id: 'D003', name: 'IT' },
        ];
        setDepartments(initialDepartments);
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Select', accessor: 'select', Cell: ({ row }) => (
                    <Form.Check
                        type="checkbox"
                        onChange={(e) => handleCheckboxChange(e, row)}
                    />
                )
            },
            { Header: t('Material.NO.'), accessor: 'no' },
            { Header: t('Material.Season'), accessor: 'season' },
            { Header: t('Material.Style Number'), accessor: 'style' },
            { Header: t('Material.Working NO.'), accessor: 'workingNo' },
            { Header: t('Material.Article NO.'), accessor: 'articleNo' },
            { Header: t('Material.Rounds'), accessor: 'rounds' },
            { Header: t('Material.Quantity'), accessor: 'quantity' },
            { Header: t('Material.Receiver Dept.'), accessor: 'receiverDept' },
            { Header: t('Material.Receiver'), accessor: 'receiver' },
            { Header: t('Material.Sender'), accessor: 'sender' },
            { Header: t('Material.Return Date'), accessor: 'returnDate' },
            { Header: t('Material.Returner'), accessor: 'returner' },
            { Header: t('Material.Note'), accessor: 'note' },
            { Header: t('Material.Update Time'), accessor: 'addedTime' },
            { Header: t('Material.Modifications'), accessor: 'modificationsTime' },
            { Header: t('Material.Catalog'), accessor: 'catalog' },
        ],
        []
    );

    const tableInstance = useTable({ columns, data }, useFilters, useSortBy);

    const handleAdd = () => {
        setModalData({});
        setModalType('add');
        setShowModal(true);
    };

    const handleEdit = () => {
        if (selectedRows.length === 1) {
            const rowData = data.find(row => row.no === selectedRows[0]);
            setModalData(rowData);
            setModalType('edit');
            setShowModal(true);
        } else {
            alert('Please choose a row to edit.');
        }
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete the selected goods?')) {
            setData(prevData => prevData.filter(row => !selectedRows.includes(row.no)));
            setSelectedRows([]);
        }
    };

    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'MaterialData');
        XLSX.writeFile(workbook, 'material_data.xlsx');
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalSave = () => {
        const currentTime = new Date().toLocaleString();
        const currentDate = new Date();

        // Validate return date
        if (modalData.returnDate && new Date(modalData.returnDate) < currentDate) {
            alert('Return date must be greater than or equal to the current date.');
            return;
        }

        // Ensure return date is properly formatted
        const formattedDate = modalData.returnDate ? modalData.returnDate.toLocaleDateString() : '';

        if (modalType === 'add') {
            const newData = { ...modalData, no: data.length + 1, addedTime: currentTime, returnDate: formattedDate };
            setData([...data, newData]);
        } else if (modalType === 'edit') {
            const updatedData = data.map(row => (row.no === modalData.no ? { ...modalData, modificationsTime: currentTime, returnDate: formattedDate } : row));
            setData(updatedData);
        }
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModalData({ ...modalData, [name]: value });
    };

    const handleDateChange = (date) => {
        setModalData({ ...modalData, returnDate: date });
    };

    const handleCheckboxChange = (e, row) => {
        const { checked } = e.target;
        if (checked) {
            setSelectedRows([...selectedRows, row.original.no]);
        } else {
            setSelectedRows(selectedRows.filter(no => no !== row.original.no));
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            tableInstance.setFilter(searchField, value);
        } else {
            tableInstance.setAllFilters([]);
        }
    };

    return (
        <div>
            <h2 className='material-title'>{t('Material.title')}</h2>
            <div className="mb-3 d-flex">
                <InputGroup className="mr-3">
                    <FormControl
                        placeholder={t('Material.search')}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </InputGroup>
                <Form.Control
                    as="select"
                    value={searchField}
                    onChange={e => setSearchField(e.target.value)}
                    className='form-select'
                >
                    {columns.map(column => (
                        <option key={column.accessor} value={column.accessor}>
                            {column.Header}
                        </option>
                    ))}
                </Form.Control>
            </div>

            <div className="buttons-container">
                <Button variant="primary" onClick={handleAdd}>{t('Material.add')}</Button>
                <Button variant="warning" onClick={handleEdit}>{t('Material.modify')}</Button>
                <Button variant="danger" onClick={handleDelete}>{t('Material.delete')}</Button>
                <Button variant="success" onClick={handleExportToExcel}>{t('Material.export')}</Button>
            </div>

            <Table {...tableInstance.getTableProps()} striped bordered hover>
                <thead>
                    {tableInstance.headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...tableInstance.getTableBodyProps()}>
                    {tableInstance.rows.map(row => {
                        tableInstance.prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === 'add' ? t('Material.add') : t('Material.modify')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formSeason">
                            <Form.Label>{t('Material.Season')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="season"
                                value={modalData.season || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStyle">
                            <Form.Label>{t('Material.Style')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="style"
                                value={modalData.style || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formWorkingNo">
                            <Form.Label>{t('Material.Working NO.')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="workingNo"
                                value={modalData.workingNo || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formArticleNo">
                            <Form.Label>{t('Material.Article NO.')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="articleNo"
                                value={modalData.articleNo || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formRounds">
                            <Form.Label>{t('Material.Rounds')}</Form.Label>
                            <Form.Control
                                type="number"
                                name="rounds"
                                value={modalData.rounds || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>{t('Material.Quantity')}</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={modalData.quantity || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formReceiverDept">
                            <Form.Label>{t('Material.Receiver Dept.')}</Form.Label>
                            <Form.Control
                                as="select"
                                name="receiverDept"
                                value={modalData.receiverDept || ''}
                                onChange={handleInputChange}
                            >
                                <option value="">{t('Material.select')}</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formReceiver">
                            <Form.Label>{t('Material.Receiver')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="receiver"
                                value={modalData.receiver || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSender">
                            <Form.Label>{t('Material.Sender')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="sender"
                                value={modalData.sender || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formReturnDate">
                            <Form.Label>{t('Material.Return Date')}</Form.Label>
                            <DatePicker
                                selected={modalData.returnDate ? new Date(modalData.returnDate) : null}
                                onChange={handleDateChange}
                                dateFormat="yyyy/MM/dd"
                                className="form-control"
                            />
                        </Form.Group>
                        <Form.Group controlId="formReturner">
                            <Form.Label>{t('Material.Returner')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="returner"
                                value={modalData.returner || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNote">
                            <Form.Label>{t('Material.Note')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="note"
                                value={modalData.note || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCatalog">
                            <Form.Label>{t('Material.Catalog')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="catalog"
                                value={modalData.catalog || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                    <Button variant="primary" onClick={handleModalSave}>
                        {modalType === 'add' ? 'add' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Material;
