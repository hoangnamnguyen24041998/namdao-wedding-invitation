import Modal from "antd/es/modal/Modal";
import { QR_HN, QR_XD } from "../assets";

const MoneyBoxModal = ({ isModalVisible, toggleModal }: any) => {
  return (
    <Modal
      title="Hộp mừng cưới"
      visible={isModalVisible}
      onCancel={toggleModal}
      footer={null}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="money-box bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between flex-1">
          <div className="text-content">
            <h3 className="text-2xl font-semibold">Mừng cưới đến chú rể</h3>
            <p className="text-sm">Ngân hàng: Vikki Digital Bank</p>
            <p className="text-sm">Chủ tài khoản: Nguyễn Hoàng Nam</p>
            <p className="text-sm">Số tài khoản: 906634281</p>
          </div>
          <div className="qr-container flex justify-center mt-2">
            <img
              src={QR_HN}
              alt="QR Code Chú Rể"
              className="qr-code w-48 h-48 border-2 border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="money-box bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between flex-1">
          <div className="text-content">
            <h3 className="text-2xl font-semibold">Mừng cưới đến cô dâu</h3>
            <p className="text-sm">Ngân hàng: Sacombank</p>
            <p className="text-sm">Chủ tài khoản: Thái Thị Xuân Đào</p>
            <p className="text-sm">Số tài khoản: 070077928926</p>
          </div>
          <div className="qr-container flex justify-center mt-2">
            <img
              src={QR_XD}
              alt="QR Code Cô Dâu"
              className="qr-code w-48 h-48 border-2 border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MoneyBoxModal;
