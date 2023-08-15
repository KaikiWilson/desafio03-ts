import { Box, Center, SimpleGrid, Spinner, Text } from "@chakra-ui/react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { api } from "../api"
import CardInfo from "../components/CardInfo"
import { AppContext } from "../components/AppContext"

interface UserData {
    email: string
    password: string
    name: string
    balance: number
    id: string
}

const Conta = () => {
    const [ userData, setUserData ] = useState<null | UserData>()
    const { id } = useParams()
    const navigate = useNavigate()

    const { isLoggedIn } = useContext(AppContext)

    !isLoggedIn && navigate('/')

    useEffect(() => {
        const getData = async () => {
            const data: any | UserData = await api
            setUserData(data)
        }

        getData()
    }, [])

    const actualData = new Date()

    if(userData && id !== userData.id) {
        navigate('/')
    }
  
    return (
        <Center display={'flex'} flexDirection={'column'}>
            <SimpleGrid columns={2} spacing={8} paddingTop={16}>
                {
                    userData === undefined || userData === null ?
                    (  
                        <Center>
                            <Spinner size='xl' color='white'/>
                        </Center>
                    ) : 
                    (
                        <>
                            <CardInfo mainContent={`Bem vindo(a) ${userData?.name}`} content={`${actualData.getDay()} / ${actualData.getMonth()} / ${actualData.getFullYear()} ${actualData.getHours()}:${actualData.getMinutes()}`} />
                            <CardInfo mainContent='Saldo' content={`R$ ${userData.balance}`}/>
                        </>
                    )
                }
            </SimpleGrid>
            <Box bg={'white'} marginTop={'2.5rem'} borderRadius={'20px'} padding={'10px'}>
                <Link to={'/infoconta'}>
                    <Text fontSize='20px' fontWeight={'lighter'}>
                        Informações da Conta
                    </Text>
                </Link>
            </Box>    
        </Center>
    )
}

export default Conta
