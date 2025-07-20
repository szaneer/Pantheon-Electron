// Device types and service for electron app
export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  models?: string[];
  lastSeen?: Date;
}

class DeviceService {
  private devices: Map<string, Device> = new Map();
  private currentUserId: string | null = null;

  setCurrentUserId(userId: string | null): void {
    this.currentUserId = userId;
    console.log('📝 Device service: set current user ID:', userId);
  }

  addDevice(device: Device): void {
    this.devices.set(device.id, device);
  }

  removeDevice(deviceId: string): void {
    this.devices.delete(deviceId);
  }

  getDevices(): Device[] {
    return Array.from(this.devices.values());
  }

  async getDevicesForUser(userId: string): Promise<Device[]> {
    // For now, just return the current devices
    // In a real implementation, this would filter by user
    console.log('📝 Device service: getting devices for user:', userId);
    return this.getDevices();
  }

  updateDeviceStatus(deviceId: string, status: 'online' | 'offline'): void {
    const device = this.devices.get(deviceId);
    if (device) {
      device.status = status;
      device.lastSeen = new Date();
    }
  }

  updateDeviceModels(deviceId: string, models: string[]): void {
    const device = this.devices.get(deviceId);
    if (device) {
      device.models = models;
    }
  }

  clear(): void {
    this.devices.clear();
  }

  onDevicesChange(userId: string, callback: (devices: Device[]) => void): () => void {
    // For now, just return a no-op unsubscribe function
    // In a real implementation, this would set up a listener for device changes
    console.log('📝 Device service: onDevicesChange called for user:', userId);
    
    // Return unsubscribe function
    return () => {
      console.log('📝 Device service: unsubscribed from device changes');
    };
  }
}

export const deviceService = new DeviceService();