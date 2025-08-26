import Modal from "antd/es/modal/Modal";
import { QR_HN, QR_XD } from "../assets";
import { GiftOutlined } from "@ant-design/icons";

const MoneyBoxModal = ({ isModalVisible, toggleModal }: any) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-pink-600 font-semibold text-lg">
          <GiftOutlined />
          <span>Hộp mừng cưới</span>
        </div>
      }
      open={isModalVisible}
      onCancel={toggleModal}
      footer={null}
      className="custom-modal"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Groom Box */}
        <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-lg font-bold text-pink-600 mb-2">
              QR CHUYỂN KHOẢN
            </h3>
            <p className="text-sm">Ngân hàng: Vikki Digital Bank</p>
            <p className="text-sm">Chủ tài khoản: Nguyễn Hoàng Nam</p>
            <p className="text-sm">Số tài khoản: 906634281</p>
          </div>
          <div className="flex justify-center mt-4">
            <img
              src={QR_HN}
              alt="QR Code Chú Rể"
              className="w-48 h-48 rounded-md shadow-md"
            />
          </div>
        </div>

        {/* Bride Box */}
        <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-lg font-bold text-pink-600 mb-2">
              QR CHUYỂN KHOẢN
            </h3>
            <p className="text-sm">Ngân hàng: Sacombank</p>
            <p className="text-sm">Chủ tài khoản: Thái Thị Xuân Đào</p>
            <p className="text-sm">Số tài khoản: 070077928926</p>
          </div>
          <div className="flex justify-center mt-4">
            <img
              src={QR_XD}
              alt="QR Code Cô Dâu"
              className="w-48 h-48 rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MoneyBoxModal;
