import ExcelJS from 'exceljs';

export const generarPresupuestoExcel = async (req, res) => {
    try {
        const { cliente, productos } = req.body; 
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Presupuesto');

        // **Encabezado**
        worksheet.mergeCells('A1', 'D1');
        worksheet.getCell('A1').value = 'Córdoba, ' + new Date().toLocaleDateString();
        worksheet.getCell('A1').font = { bold: true };

        worksheet.mergeCells('A2', 'D2');
        worksheet.getCell('A2').value = 'PRESUPUESTO';
        worksheet.getCell('A2').font = { bold: true, size: 14 };

        worksheet.mergeCells('A3', 'D3');
        worksheet.getCell('A3').value = `SRES: ${cliente}`;
        worksheet.getCell('A3').font = { bold: true };

        worksheet.addRow([]);

        // **Tabla de productos**
        const headerRow = worksheet.addRow(['Descripcion', 'Cantidad', 'PRECIO Unitario', 'Total']);
        headerRow.font = { bold: true };
        headerRow.eachCell((cell) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '92D050' } };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });

        productos.forEach((prod, index) => {
            const precioUnitario = parseFloat(prod.precioUnitario).toFixed(2).replace('.', ',');
            const row = worksheet.addRow([prod.descripcion, prod.cantidad, precioUnitario]);
            row.getCell(4).value = { formula: `B${index + 6}*C${index + 6}` }; // Fórmula para calcular el total de cada ítem
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
        });

        worksheet.addRow([]);
        const subtotalRow = worksheet.addRow(['', '', 'Subtotal', { formula: `SUM(D6:D${5 + productos.length})` }]);
        subtotalRow.font = { bold: true };
        subtotalRow.getCell(3).border = {};
        subtotalRow.getCell(4).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        const ivaRow = worksheet.addRow(['', '', 'IVA (21%)', { formula: `D${7 + productos.length}*0.21` }]);
        ivaRow.font = { bold: true };
        ivaRow.getCell(3).border = {};
        ivaRow.getCell(4).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        const totalRow = worksheet.addRow(['', '', 'Total', { formula: `D${7 + productos.length}+D${8 + productos.length}` }]);
        totalRow.font = { bold: true };
        totalRow.getCell(3).border = {};
        totalRow.getCell(4).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        worksheet.addRow([]);
        worksheet.addRow(['Recibí en conformidad.']);
        worksheet.addRow(['Presupuesto válido por 15 días desde la entrega.']);

        // **Notas**
        worksheet.addRow([]);
        worksheet.addRow(['IMPORTANTE!!']).font = { bold: true };
        worksheet.addRow(['Si ya tienes en tus manos nuestros productos Menta te recordamos que:']);
        worksheet.addRow(['1. Tienes 5 días para realizar el control y reclamos de tu mercadería.']);
        worksheet.addRow(['2. Los armazones NO TIENEN repuesto, en caso de falla de fábrica será reemplazada.']);
        worksheet.addRow(['3. Los envíos de pedidos personales se realizarán vía cadete.']);
        worksheet.addRow(['4. Pedimos respetar los plazos pactados de pago.']);
        worksheet.addRow(['5. Cotización al tipo de cambio vendedor en Dolarhoy.com']);

        // Ajustar el formato de las celdas para que se muestren como moneda
        worksheet.getColumn(3).numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';
        worksheet.getColumn(4).numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';

        // **Enviar el archivo**
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=presupuesto.xlsx');

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al generar el archivo Excel' });
    }
};