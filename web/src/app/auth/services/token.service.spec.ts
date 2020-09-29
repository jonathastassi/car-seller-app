import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('O serviço TokenService', () => {
  let service: TokenService;
  let KEY_AUTH = "car_seller_app";


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve setar um token no localstorage', () => {
    service.setValue(KEY_AUTH);
    const token = service.getValue();
    expect(token).toBe(KEY_AUTH);
  })

  it('Deve retornar o token do localstorage', () => {
    service.setValue(KEY_AUTH);
    const token = service.getValue();
    expect(token).toBe(KEY_AUTH);
  })

  it('Deve remover um valor do LocalStorage', () => {
    service.setValue(KEY_AUTH);
    service.removeValue();
    const token = service.getValue();
    expect(token).toBe(null);
  });

  it('Deve verificar se existe token no localstorage, retornar true', () => {
    service.setValue(KEY_AUTH);
    const hasValue = service.hasValue();
    expect(hasValue).toBeTrue();
  });

  it('Deve verificar se não existe token no localstorage, retornar false', () => {
    const hasValue = service.hasValue();
    expect(hasValue).toBeFalse();
  });

  afterEach(() => {
    localStorage.clear();
  })
});
