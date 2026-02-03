const { processMessage } = require('../../controllers/chat.controller');

describe('Chat Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  it('should respond to "hello" in English', async () => {
    req.body = { message: 'Hello there', language: 'en' };
    await processMessage(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      response: expect.stringContaining('Welcome to Saleem Hotel Management System')
    }));
  });

  it('should respond to "booking" in English', async () => {
    req.body = { message: 'I want to make a booking', language: 'en' };
    await processMessage(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      response: expect.stringContaining('You can manage bookings')
    }));
  });

  it('should respond to "مرحبا" in Arabic', async () => {
    req.body = { message: 'مرحبا', language: 'ar' };
    await processMessage(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      response: expect.stringContaining('مرحباً بك في نظام سليم')
    }));
  });

  it('should return default message for unknown queries', async () => {
    req.body = { message: 'xyz123', language: 'en' };
    await processMessage(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      response: expect.stringContaining('I am an AI assistant in training')
    }));
  });
});
