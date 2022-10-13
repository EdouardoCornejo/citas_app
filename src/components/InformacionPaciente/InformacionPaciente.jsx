import React from 'react'
import { Text, SafeAreaView, View, StyleSheet, Pressable, Alert } from 'react-native'
import {dateFormat} from '../helpers'

const InformacionPaciente = ({paciente, setModalPaciente, setPaciente}) => {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Informacion {' '}
          <Text style={styles.titleBold}>Paciente</Text>
      </Text>

      <View>
        <Pressable
        style={styles.btnClose}
          onPress={()=> {
            Alert.alert(
              'Nota: ',
              '¿Desea cerrar registro?',
              [{text: 'Cancelar'}, {text: ' '}, {text: 'Cerrar ', onPress: () => {
                setModalPaciente(false)
                setPaciente({})
              }}]
            ) 
          }}
        >
          <Text style={styles.btnCloseText}> X Cerrar</Text>
        </Pressable>
      </View>

      <View
        style={styles.contenido}
      >
        <View>
          <Text style={styles.label}>Nombre: </Text>
          <Text style={styles.valor}>{paciente.paciente}</Text>
        </View>

        <View>
          <Text  style={styles.label}>Propietario: </Text>
          <Text style={styles.valor}>{paciente.propietario}</Text>
        </View>

        <View>
          <Text style={styles.label}>Email: </Text>
          <Text style={styles.valor}>{paciente.email}</Text>
        </View>

        <View>
          <Text style={styles.label}>Telefono: </Text>
          <Text style={styles.valor}>{paciente.telefono}</Text>
        </View>

        <View>
          <Text style={styles.label}>Fecha Alta: </Text>
          <Text style={styles.valor}>{dateFormat(paciente.fecha)}</Text>
        </View>

        <View >
          <Text style={styles.label}>Sintomas: </Text>
          <Text style={styles.valor}>{paciente.sintomas}</Text>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#F59E0B',
    flex:1,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  titleBold: {
    fontWeight: '900',
  },
  btnClose: {
    marginVertical: 30,
    backgroundColor: '#E06900',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCloseText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  contenido: {
    backgroundColor: '#FFF',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  label: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '600',
    fontSize: 12,
  },
  valor: {
    fontWeight: '700',
    fontSize:  20,
    color: '#334155'
  }
})

export default InformacionPaciente