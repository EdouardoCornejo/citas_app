import React, { useState, useEffect } from 'react';
import {Modal, Text, SafeAreaView, StyleSheet, TextInput, View, ScrollView, Pressable, Alert} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { dateFormat } from '../helpers'
 
const Formulario = ({
    modalVisible,
    cerrarModal,
    setPacientes, 
    pacientes, 
    paciente: pacienteObj,
    setPaciente: setPacienteApp,
}) => {
  const [paciente, setPaciente] = useState ('')
  const [id, setId] = useState ('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fecha, setFecha] = useState(new Date())
  const [sintomas, setSintomas] = useState('')
  
  useEffect(()=>{
    if(Object.keys(pacienteObj).length >0){
      setId(pacienteObj.id)
      setPaciente(pacienteObj.paciente)
      setPropietario(pacienteObj.propietario)
      setEmail(pacienteObj.email)
      setTelefono(pacienteObj.telefono)
      setFecha(pacienteObj.fecha)
      setSintomas(pacienteObj.sintomas)
    }

  }, [pacienteObj])
 
  const handleCancel = () => {
    Alert.alert(
      'Nota:',
      '¿Desea descartar registro?',
      
        [{text: 'Cancelar'},{text:''},
        {
          text: 'Confirmar',
          onPress: () => {
            cerrarModal()
            setPacienteApp({})
            setId('')
            setPaciente('')
            setPropietario('')
            setEmail('')
            setTelefono('')
            setFecha(new Date())
            setSintomas('')
          },
        },]
    ) 
    }

  const handleDate = () => {
    //Validations complete
    const today = Date.now()

    if([paciente, propietario, email, fecha, sintomas].includes('')){
      Alert.alert(
        'Error',
        'Todos los campos son obligatorios'
      ) 
      return
    } else if(fecha < today){
      Alert.alert(
        'Error',
        'Fecha / Hora no valida'
      ) 
      return
    }else if(telefono.length < 10 ){
      Alert.alert(
        'Error',
        'Telefono debe ser mayor a 10 digitos '
      ) 
      return
    }

    const nuevoPaciente = {
      paciente, 
      propietario,
      email,
      telefono,
      fecha,
      sintomas
    }

    if(id){
      //Edit
      nuevoPaciente.id = id
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === nuevoPaciente.id ? nuevoPaciente : 
        pacienteState )
        setPacientes(pacientesActualizados)
        setPacienteApp({})
    }else{
        // Nuevo Registro
        nuevoPaciente.id = Date.now()
        setPacientes([...pacientes, nuevoPaciente])
    }

    cerrarModal()
    setPaciente('')
    setPropietario('')
    setEmail('')
    setTelefono('')
    setFecha(new Date())
    setSintomas('')
  }

  return (
    <Modal
      animationType="slide" 
      visible={modalVisible}
    >
      <SafeAreaView style={styles.content}>
        <ScrollView>
          <Text style={styles.title}>{pacienteObj.id ? 'Editar' : 'Nueva'} {' '} 
            <Text style={styles.titleBold}>Cita</Text>
          </Text>

          <Pressable
            style={styles.btnCancel}
            onPress={handleCancel}
           > 
            <Text style={styles.btnCanceltext}> X {''} Cancelar</Text>
           </Pressable>

          <View style={styles.campo}>
            
            <Text style={styles.label}>Nombre Paciente:</Text>
              <TextInput 
                style={styles.input}
                placeholder='Nombre Paciente'
                placeholderTextColor={'#666'}
                value={paciente}
                onChangeText={setPaciente}
              />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario:</Text>
              <TextInput 
                style={styles.input}
                placeholder='Nombre Propietario'
                placeholderTextColor={'#666'}
                value={propietario}
                onChangeText={setPropietario}
              />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario:</Text>
              <TextInput 
                style={styles.input}
                placeholder='Ingresa un Email'
                placeholderTextColor={'#666'}
                keyboardType={'email-address'}
                value={email}
                onChangeText={setEmail}
              />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono Propietario:</Text>
              <TextInput 
                style={styles.input}
                placeholder='Teléfono Propietario:'
                placeholderTextColor={'#666'}
                keyboardType={'phone-pad'}
                value={telefono}
                onChangeText={setTelefono}
                maxLength={10}
              />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>
              <View style={styles.dateContainer}>
                <DatePicker
                 date={fecha}
                  locale='es'
                  onDateChange={(date)=> setFecha(date)}
                />
                
              </View>
          </View>

          <View style={styles.campo}>
              <Text style={styles.label}>Síntomas</Text>
              <TextInput
                style={[styles.input, styles.symptom]}
                placeholder='Sintomas Paciente:'
                placeholderTextColor={'#666'}
                value={sintomas}
                onChangeText={setSintomas}
                // multiline={true}
                // numberOfLines={4}
              />
          </View>    

          <Pressable
              style={styles.btmNewDate}
              onPress={handleDate}
           > 
            <Text style={styles.btmNewDateText}>{pacienteObj.id ? 'Editar' : 'Agregar'} Paciente</Text>
           </Pressable> 

        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },  
  title: {
    fontSize: 30,
    textWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF'
  },
  titleBold:{
    fontWeight: '900',
  },
  campo: {
    margintTop: 40,
    marginHorizontal: 30,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  symptom: {
    height: 100,
  },

  btnCancel: {
    marginTop: 20,
    marginBotton: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCanceltext: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  dateContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  btmNewDate: {
    marginVertical: 50,
    backgroundColor: '#f59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btmNewDateText: {
    color: '#5827A4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
})

export default Formulario;
