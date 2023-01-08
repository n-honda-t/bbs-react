import { Get, JsonController } from "routing-controllers";

@JsonController()
export class TestController {
    @Get('/test')
    async test() {
        return {
            message: 'testa'
        }
    }
}