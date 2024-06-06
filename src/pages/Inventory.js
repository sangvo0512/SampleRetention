import React, { useState, useMemo } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';
import { Button, Modal, Form, Table, InputGroup, FormControl } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/Inventory.css';
import { useTranslation } from 'react-i18next';
const sampleInventoryData = [
    // Dữ liệu mẫu cho Inventory, chuyển đổi thành chuỗi
    { no: 1, season: 'Spring', styleNumber: 'S123', workingNo: 'W001', articleNo: 'A123', quantity: 100, location: 'Warehouse 1', inventoryDate: new Date().toLocaleDateString(), countQuantity: 95, counter1: 'John', counter2: 'Doe', note: 'Checked', modificationTime: new Date().toLocaleString() },
    { no: 2, season: 'Summer', styleNumber: 'S124', workingNo: 'W002', articleNo: 'A124', quantity: 200, location: 'Warehouse 2', inventoryDate: new Date().toLocaleDateString(), countQuantity: 190, counter1: 'Jane', counter2: 'Smith', note: 'Checked', modificationTime: new Date().toLocaleString() },
];

const Inventory = ({ materialData }) => {
    const [data, setData] = useState(sampleInventoryData);
    const [selectedRows, setSelectedRows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [modalType, setModalType] = useState('add');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('season');
    const { t, i18n } = useTranslation();
    const columns = useMemo(
        () => [
            {
                Header: 'Select',
                accessor: 'select',
                Cell: ({ row }) => (
                    <input
                        type="checkbox"
                        checked={selectedRows.includes(row.original.no)}
                        onChange={(e) => handleCheckboxChange(e, row)}
                    />
                ),
            },
            { Header: t('Inventory.NO.'), accessor: 'no' },
            { Header: t('Inventory.Season'), accessor: 'season' },
            { Header: t('Inventory.Style Number'), accessor: 'style' },
            { Header: t('Inventory.Working NO.'), accessor: 'workingNo' },
            { Header: t('Inventory.Article NO.'), accessor: 'articleNo' },
            { Header: t('Inventory.Rounds'), accessor: 'rounds' },
            { Header: t('Inventory.Quantity'), accessor: 'quantity' },
            { Header: t('Inventory.Location'), accessor: 'location' },
            { Header: t('Inventory.Inventory Date'), accessor: 'inventoryDate' },
            { Header: t('Inventory.Count Quantity'), accessor: 'countQuantity' },
            { Header: t('Inventory.Counter 1'), accessor: 'counter1' },
            { Header: t('Inventory.Counter 2'), accessor: 'counter2' },
            { Header: t('Inventory.Note'), accessor: 'note' },
            { Header: t('Inventory.Modifications'), accessor: 'modificationTime' },
        ],
        [selectedRows]
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
            setModalData({ ...rowData, inventoryDate: new Date(rowData.inventoryDate) });
            setModalType('edit');
            setShowModal(true);
        } else {
            alert('Vui lòng chọn một hàng để chỉnh sửa.');
        }
    };

    const handleDelete = () => {
        if (window.confirm('Bạn có chắc muốn xóa các hàng đã chọn không?')) {
            setData(prevData => prevData.filter(row => !selectedRows.includes(row.no)));
            setSelectedRows([]);
        }
    };

    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'InventoryData');
        XLSX.writeFile(workbook, 'inventory_data.xlsx');
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalSave = () => {
        const currentTime = new Date().toLocaleString();
        const currentDate = new Date();

        // Ensure inventory date and modification time are properly formatted
        const formattedInventoryDate = modalData.inventoryDate ? modalData.inventoryDate.toLocaleDateString() : currentDate.toLocaleDateString();
        const formattedModificationTime = currentTime;

        if (modalType === 'add') {
            const newData = { ...modalData, no: data.length + 1, inventoryDate: formattedInventoryDate, modificationTime: currentTime };
            setData([...data, newData]);
        } else if (modalType === 'edit') {
            const updatedData = data.map(row => (row.no === modalData.no ? { ...modalData, inventoryDate: formattedInventoryDate, modificationTime: formattedModificationTime } : row));
            setData(updatedData);
        }
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModalData({ ...modalData, [name]: value });
    };

    const handleDateChange = (date) => {
        setModalData({ ...modalData, inventoryDate: date });
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
            <h2 className='inventory-title'>{t('Inventory.title')}</h2>
            <div className="mb-3 d-flex">
                <InputGroup className="mr-3">
                    <FormControl
                        placeholder={t('Inventory.search')}
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
                <Button variant="primary" onClick={handleAdd}>{t('Inventory.add')}</Button>
                <Button variant="warning" onClick={handleEdit}>{t('Inventory.modify')}</Button>
                <Button variant="danger" onClick={handleDelete}>{t('Inventory.delete')}</Button>
                <Button variant="success" onClick={handleExportToExcel}>{t('Inventory.export')}</Button>
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
                                    <td {...cell.getCellProps()}>
                                        {cell.column.id === 'inventoryDate' ?
                                            new Date(cell.value).toLocaleDateString() :
                                            cell.render('Cell')
                                        }
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === 'add' ? 'Thêm Dữ Liệu' : 'Sửa Dữ Liệu'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formSeason">
                            <Form.Label>{t('Inventory.Season')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="season"
                                value={modalData.season || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStyleNumber">
                            <Form.Label>{t('Inventory.Style Number')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="styleNumber"
                                value={modalData.styleNumber || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formWorkingNo">
                            <Form.Label>{t('Inventory.Working NO.')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="workingNo"
                                value={modalData.workingNo || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formArticleNo">
                            <Form.Label>{t('Inventory.Article NO.')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="articleNo"
                                value={modalData.articleNo || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>{t('Inventory.Quantity')}</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={modalData.quantity || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLocation">
                            <Form.Label>{t('Inventory.Location')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={modalData.location || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCountQuantity">
                            <Form.Label>{t('Inventory.Count Quantity')}</Form.Label>
                            <Form.Control
                                type="number"
                                name="countQuantity"
                                value={modalData.countQuantity || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCounter1">
                            <Form.Label>{t('Inventory.Counter 1')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="counter1"
                                value={modalData.counter1 || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCounter2">
                            <Form.Label>{t('Inventory.Counter 2')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="counter2"
                                value={modalData.counter2 || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNote">
                            <Form.Label>{t('Inventory.Note')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="note"
                                value={modalData.note || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formInventoryDate">
                            <Form.Label>{t('Inventory.Inventory Date')}</Form.Label>
                            <DatePicker
                                selected={modalData.inventoryDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                                isClearable
                                placeholderText={t('Inventory.select')}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleModalSave}>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Inventory;
