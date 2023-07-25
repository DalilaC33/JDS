import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: { backgroundColor: '#FFFFFF' },
    text: { fontSize: '11px', marginHorizontal: '5px' },
    smallText: { fontSize: '8px', margin: '2px' },
    bigText: { fontSize: '13px', margin: '2px', color: 'red', alignItems: 'center', textAlign: 'center' },
    row: { flexDirection: "row", flexWrap: "wrap", paddingVertical: '5px'},
    mainBox: { 
        color: 'black', 
        textAlign: 'center', 
        margin: 30, 
        height: '380px', 
        border: '1px',
        borderColor: '#AAAAAA',
        padding: '10px'
    },
        mainBox_Header: {
            height: '80px',
            flexDirection: "row",
            flexWrap: "wrap",
        },
            mainBox_Header_1: {
                width: '70%',
                height: '80px',
                alignItems: 'center',
            },
                mainBox_Header_1_content: {
                    marginTop: '20px',
                    alignItems: 'center',
                },
            mainBox_Header_2: {
                width: '30%',
                height: '80px',
                border: '1px',
                borderColor: '#AAAAAA',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
                borderBottomRightRadius: '5px',
                borderBottomLeftRadius: '5px',
                alignItems: 'start',
                textAlign: 'left',
            },
        mainBox_Content: {
            marginTop: '17px',
            paddingTop: '8px',
            borderTop: '1px',
            borderColor: '#AAAAAA',
            height: '290px',
        },
            mainBox_ClientDetails: {
                height: '80px',
                flexDirection: "row",
                flexWrap: "wrap",
            },
                mainBox_ClientDetails_Content_1: {
                    height: '80px',
                    width: '70%',
                },
                mainBox_ClientDetails_Content_2: {
                    height: '80px',
                    width: '30%',
                },
            table_Header: {
                marginTop: '10px',
                backgroundColor: '#8BF',
                height: '25px',
            },
            table_Row: {
                marginTop: '-1px',
                height: '25px',
                border: '1px',
                borderColor: '#BBBBBB',
                flexDirection: "row",
                flexWrap: "wrap", 
            },
                row1: {
                    paddingTop: '5px',
                    width: '70%',
                    height: '25px',
                    alignItems: 'right',
                    textAlign: 'left',
                    paddingHorizontal: '20px'
                },
                row2: {
                    paddingTop: '5px',
                    width: '30%',
                    height: '25px',
                    alignItems: 'end',
                    textAlign: 'right',
                    paddingHorizontal: '20px'
                },
            table_End: {
                flexDirection: "row",
                flexWrap: "wrap", 
                marginTop: '-1px',
                border: '1px',
                backgroundColor: '#DAEAF1',
                borderColor: '#8BF',
            },
    image: {
        width: 500,
        height: 500,
    },

});

const FacturaPDF = ({Nombre, Apellido, RUC, Direccion, Fecha, ConsumoMinimo, ConsumoExcedente, IVA, Deuda, ESSAN, Total, Numero }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.mainBox}>
                    <View style={styles.mainBox_Header}>
                        <View style={styles.mainBox_Header_1}>
                            <View style={styles.mainBox_Header_1_content}>
                                <Text>Junta de Saneamiento</Text>
                                <Text>Ñande Y</Text>
                            </View>
                        </View>
                        <View style={styles.mainBox_Header_2}>
                            <Text style={styles.smallText}>Timbrado N° 15017453</Text>
                            <Text style={styles.smallText}>Fecha Inicio Vigencia: 04/08/2021</Text>
                            <Text style={styles.smallText}>Fecha Inicio Vigencia: 31/08/2022</Text>
                            <Text style={styles.smallText}>R.U.C. 80.032.253-3</Text>
                            <Text style={styles.smallText}>Factura N°</Text>
                            <Text style={styles.bigText}>{`${Numero}`}</Text>
                        </View>
                    </View>
                    <View style={styles.mainBox_Content}>
                        <View style={styles.mainBox_ClientDetails}>
                            <View style={styles.mainBox_ClientDetails_Content_1}>
                                <View style={styles.row}>
                                    <Text style={styles.text}>Nombre: </Text>
                                    <Text style={styles.text}>{`${Nombre}`}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.text}>Apellido: </Text>
                                    <Text style={styles.text}>{`${Apellido}`}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.text}>Ruc: </Text>
                                    <Text style={styles.text}>{`${RUC}`}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.text}>Dirección: </Text>
                                    <Text style={styles.text}>{`${Direccion}`}</Text>
                                </View>
                            </View>
                            <View style={styles.mainBox_ClientDetails_Content_2}>
                                <View style={styles.row}>
                                    <Text style={styles.text}>Fecha: </Text>
                                    <Text style={styles.text}>{`${Fecha}`}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={styles.table_Header}>

                            </View>
                            <View style={styles.table_Row}>
                                <View style={styles.row1}>
                                    <Text style={styles.text}>Consumo Mínimo </Text>
                                </View>
                                <View style={styles.row2}>
                                    <Text style={styles.text}>{`${ConsumoMinimo}`} Gs</Text>
                                </View>
                            </View>
                            <View style={styles.table_Row}>
                                <View style={styles.row1}>
                                    <Text style={styles.text}>Consumo Exedente </Text>
                                </View>
                                <View style={styles.row2}>
                                    <Text style={styles.text}>{`${ConsumoExcedente}`} Gs</Text>
                                </View>
                            </View>
                            <View style={styles.table_Row}>
                                <View style={styles.row1}>
                                    <Text style={styles.text}>IVA</Text>
                                </View>
                                <View style={styles.row2}>
                                    <Text style={styles.text}>{`${IVA}`} Gs</Text>
                                </View>
                            </View>
                            <View style={styles.table_Row}>
                                <View style={styles.row1}>
                                    <Text style={styles.text}>Deuda</Text>
                                </View>
                                <View style={styles.row2}>
                                    <Text style={styles.text}>{`${Deuda}`} Gs</Text>
                                </View>
                            </View>
                            <View style={styles.table_Row}>
                                <View style={styles.row1}>
                                    <Text style={styles.text}>ESSAN</Text>
                                </View>
                                <View style={styles.row2}>
                                    <Text style={styles.text}>{`${ESSAN}`} Gs</Text>
                                </View>
                            </View>
                            <View style={styles.table_End}>
                                <View style={styles.row1}>
                                    <Text style={styles.text}>TOTAL</Text>
                                </View>
                                <View style={styles.row2}>
                                    <Text style={styles.text}>{`${Total}`} Gs</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default FacturaPDF