import React, { useState } from 'react';
import { 
    Text, 
    StyleSheet, 
    View, 
    TextInput, 
    Button, 
    TouchableHighlight, 
    Alert, 
    ScrollView
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({citas, setCitas, guardarMostrarForm}) => {

    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');
    const [sintomas, guardarSintomas] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }

    const confirmarFecha = date => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    }

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    }

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    }

    const confirmarHora = time => {
        const opciones = { hour: 'numeric', minute: '2-digit' };
        guardarHora(time.toLocaleTimeString('es-ES', opciones));
        hideTimePicker();
    }

    const crearNuevaCita = () => {
        if(paciente.trim() === '' || 
            propietario.trim() === '' || 
            fecha.trim() === '' || 
            hora.trim() === '' || 
            sintomas.trim() === '') 
            {
                mostrarAlerta();
                return;
            }

        const cita = { paciente, propietario, telefono, fecha, hora, sintomas }

        cita.id = shortid.generate();

        const citasNew = [...citas, cita];
        setCitas(citasNew);

        guardarMostrarForm(false);

    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error', //title
            'Todos los campos son obligatorios',
            [{
                text: 'OK'
            }]
        )
    }

    return (
        <>
        <ScrollView style={styles.formulario}>
            <View>
                <Text style={styles.label}>Paciente:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={ texto => guardarPaciente(texto) }
                />
            </View>
            <View>
                <Text style={styles.label}>Dueño:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={ (texto) => guardarPropietario(texto) }
                />
            </View>
            <View>
                <Text style={styles.label}>Teléfono de contacto:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={ (texto) => guardarTelefono(texto) }
                    keyboardType="numeric"
                />
            </View>
            <View>
                <Text style={styles.label}>Fecha:</Text>
                <Button title="Seleccionar fecha" onPress={showDatePicker} />
                <DateTimePickerModal 
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={confirmarFecha}
                    onCancel={hideDatePicker}
                    locale="es_ES"
                    headerTextIOS="Elige una fecha"
                />
                <Text>{fecha}</Text>
            </View>
            <View>
                <Text style={styles.label}>Hora:</Text>
                <Button title="Seleccionar hora" onPress={showTimePicker} />
                <DateTimePickerModal 
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={confirmarHora}
                    onCancel={hideTimePicker}
                    locale="es_ES"
                    headerTextIOS="Elige una hora"
                    is24Hour
                />
                <Text>{hora}</Text>
            </View>
            <View>
                <Text style={styles.label}>Sintomas:</Text>
                <TextInput 
                    multiline
                    style={styles.input}
                    onChangeText={ (texto) => guardarSintomas(texto) }
                />
            </View>

            <View>
                <TouchableHighlight onPress={ () => crearNuevaCita() } style={styles.btnSubmit}>
                    <Text style={styles.textoSubmit}>Crear nueva cita</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#E1E1E1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#7D024E',
        marginVertical: 10
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default Formulario;