import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import {dateFormat} from '../helpers'

const Paciente = ({
    item, 
    setPaciente,
    setModalVisible, 
    pacienteEditar, 
    pacienteEliminar, 
    setModalPaciente
}) => {
    const {paciente, fecha, id } = item 

  return (
    <Pressable
        onLongPress={()=> {setModalPaciente(true)
            setPaciente(item)
        }}
    >
        <View style={styles.container}>
        <Text style={styles.label}>paciente</Text>
            <Text style={styles.text}> {paciente}</Text>
            <Text style={styles.date}>{dateFormat(fecha)}</Text>
        
        <View style={styles.contenedorBotones}>
            <Pressable 
                style={[styles.btn, styles.btnEditar]}
                onPress={()=>{
                setModalVisible(true)
                pacienteEditar(id)
                }}
            >
                <Text style={styles.btnTexto}>Editar</Text>
            </Pressable>

            <Pressable 
                style={[styles.btn, styles.btnEliminar]}
                onPress={() => pacienteEliminar(id)}
            >
                <Text style={styles.btnTexto}>Eliminar</Text>
            </Pressable>


        </View>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#94a3B8',
    borderBottomWidth: 1,
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    color: '#6D28D9',
    fontSize: 20,
    fontWeight:'700',
    marginBottom: 10,

  },
  date: {
    color: '#374151',
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  }, 
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEditar: {
    backgroundColor: '#F59E0B',
  },
  btnEliminar: {
    backgroundColor: '#EF4444',
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF'
  }
})

export default Paciente