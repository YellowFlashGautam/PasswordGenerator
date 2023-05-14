import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

//Form validation
import * as Yup from 'yup'
import {Formik} from 'formik'

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number().min(4, 'Minimum length is 4')
  .max(10, 'Maximum length is 10').required('Password length is required')
})

export default function App() {

  //const [1st value is variable name, 2nd value is method which will update 1st value]
  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)
  const [lowerCase, setLowercase] = useState(false)
  const [upperCase, setUppercase] = useState(false)
  const[numbers, isNumbers] = useState(false)
  const[symbols, isSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let charList = ''

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const numberChars = '0123456789'
    const specialChars = '!@#$%^&*()_+'

    if(upperCase) {
      charList += upperCaseChars
    } 
     if (lowerCase) {
      charList += lowerCaseChars
    } 
     if (numbers) {
      charList += numberChars
    } 
     if (symbols){
      charList += specialChars
    }

    const passwordResult = createPassword(charList, passwordLength)
    if(passwordResult.length > 0) {
      setPassword(passwordResult)
      setIsPassGenerated(true)
    }
  }

  const createPassword = (characters: string, passwordLength: number) : string => {
    if(characters == null || characters.length <= 0 || passwordLength <= 0) {
      return ''
    }

    let result = ''
    for(let i = 0; i< passwordLength; i++) {
      let charIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(charIndex)
    }

    return result
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowercase(false)
    setUppercase(false)
    isNumbers(false)
    isSymbols(false)
  }
  
  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={(values) => {
         console.log(values);
         generatePasswordString(+values.passwordLength)
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         isSubmitting,
         handleReset,
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
           <View style={styles.inputColumn}>
             <Text style={styles.heading}>Password length</Text>
             {touched.passwordLength && errors.passwordLength && (
               <Text style={styles.errorText}>
                 {errors.passwordLength}
               </Text>
             )}
           </View>
           <TextInput style={styles.inputStyle}
             value={values.passwordLength}
             onChangeText={handleChange('passwordLength')}
             placeholder='Ex. 8'
             keyboardType='numeric'
             />
         </View>
         <View style={styles.inputWrapper}>
           <Text style={styles.heading}>Include Lower case</Text>
           <BouncyCheckbox disableBuiltInState
           isChecked={lowerCase}
           onPress={() => setLowercase(!lowerCase)}
           fillColor='#23C4ED'
           />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Upper case</Text>
           <BouncyCheckbox disableBuiltInState
           isChecked={upperCase}
           onPress={() => setUppercase(!upperCase)}
           fillColor='#383CC1'
           />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Numbers</Text>
           <BouncyCheckbox disableBuiltInState
           isChecked={numbers}
           onPress={() => isNumbers(!numbers)}
           fillColor='#38CC77'
           />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Symbols</Text>
           <BouncyCheckbox disableBuiltInState
           isChecked={symbols}
           onPress={() => isSymbols(!symbols)}
           fillColor='#F4BE2C'
           />
         </View>

         <View style={styles.formActions}>
           <TouchableOpacity disabled={!isValid}
           style={styles.primaryBtn}
           onPress={handleSubmit}>
             <Text style={styles.primaryBtnTxt}>Generate Password</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.secondaryBtn}
           onPress={() => {
             handleReset(); 
             resetPasswordState()
             }}>
           <Text style={styles.secondaryBtnTxt}>Reset</Text>
           </TouchableOpacity>
         </View>
         </>
       )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long press to copy.</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});