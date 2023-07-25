import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import numeroALetras from "../../../utils/numeroALetras";

//Recibe los datos que será impreso

const ReciboPDF = ({ props, reciboNumero }) => {
  const date = new Date();
  return (
    <>
      <Document fileName="recibo.pdf">
        <Page
          size="A4"
          style={{
            display: "flex",
            backgroundColor: "white",
          }}
        >
          <View style={[styles.table, styles.mainBox]}>
            <View style={[{ marginTop: 10, marginBottom: 10 }, styles.row]}>
              <Text
                style={{ width: "20%", marginLeft: 15 }}
              >{`N.º ${reciboNumero}`}</Text>
              <Text style={{ width: "50%", textAlign: "center" }}>RECIBO</Text>
              <Text
                style={[
                  { width: "30%", border: 1, marginLeft: 5, marginRight: 5 },
                ]}
              >{`Gs. ${new Intl.NumberFormat("es-CO").format(
                props.total
              )} #`}</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ marginLeft: 350, marginBottom: 10 }}
              >{`${date.getDay()} de ${date.toLocaleString("es-es", {
                month: "long",
              })} del ${date.getFullYear()}`}</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ marginLeft: 15, marginBottom: 10 }}
              >{`Recibí(mos) de ${props.nombre}  ${props.apellido}`}</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{marginLeft: 15 }}
              >
                {`La cantidad de guaraníes  ${numeroALetras(props.total)}.-- `}
              </Text>
            </View>
            <View style={{ marginBottom: 30 }}>
              <Text style={{ marginLeft: 15 }}>
                {`En concepto de pago factura N° ${props.facturaNumero}.--`}
              </Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginLeft: 300 }}>_______________________</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginLeft: 350 }}>Firma y aclaración</Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};
const styles = StyleSheet.create({
  mainBox: {
    color: "black",
    margin: 20,
    height: "300px",
    border: "1px",
    borderColor: "#AAAAAA",
  },
  table: {
    width: "95%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default ReciboPDF;
